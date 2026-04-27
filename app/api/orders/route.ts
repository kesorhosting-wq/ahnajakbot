import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { env } from '@/lib/env';
function tx(){return 'ORD-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,7).toUpperCase()}
export async function POST(req:Request){
 const auth=req.headers.get('x-internal-secret'); if(auth!==env.backendSecret)return NextResponse.json({error:'Forbidden'},{status:403});
 const b=await req.json(); if(!/^[a-zA-Z0-9_]{3,16}$/.test(b.minecraft_username))return NextResponse.json({error:'Invalid Minecraft username'},{status:400});
 const {data:product}=await supabaseAdmin.from('products').select('*').eq('id',b.product_id).eq('enabled',true).maybeSingle(); if(!product)return NextResponse.json({error:'Product not found'},{status:404});
 const {data:settings}=await supabaseAdmin.from('settings').select('*').eq('guild_id',b.guild_id).maybeSingle();
 const transactionId=tx();
 const callbackUrl=`${env.publicBase}/api/payment/callback?guild_id=${encodeURIComponent(b.guild_id)}&order=${transactionId}`;
 const {data:order,error}=await supabaseAdmin.from('orders').insert({guild_id:b.guild_id,discord_user_id:b.discord_user_id,minecraft_username:b.minecraft_username,product_id:product.id,server_id:product.server_id,amount:product.price,status:'pending',transaction_id:transactionId}).select('*').single(); if(error)return NextResponse.json({error:error.message},{status:500});
 const r=await fetch(`${env.khqrApi}/generate-khqr`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount:product.price,transactionId,username:b.minecraft_username,callbackUrl,secret:settings?.webhook_secret||env.defaultWebhookSecret,merchantName:settings?.merchant_name||'AhnajakMCStore',merchantId:settings?.merchant_id||'sonmeng_leng@bkrt'})});
 const qr=await r.json(); if(!r.ok)return NextResponse.json({error:'KHQR failed',detail:qr},{status:500});
 return NextResponse.json({order,product,qr});
}
export async function GET(req:Request){const auth=req.headers.get('x-internal-secret'); if(auth!==env.backendSecret)return NextResponse.json({error:'Forbidden'},{status:403}); const id=new URL(req.url).searchParams.get('transaction_id'); const {data}=await supabaseAdmin.from('orders').select('*').eq('transaction_id',id).maybeSingle(); return NextResponse.json({order:data})}
