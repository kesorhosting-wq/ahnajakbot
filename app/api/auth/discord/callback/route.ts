import { NextResponse } from 'next/server';
import { exchangeCode, getDiscordUser } from '@/lib/discord';
import { setSession } from '@/lib/session';
import { supabaseAdmin } from '@/lib/supabase';
import { env } from '@/lib/env';
export async function GET(req:Request){try{const url=new URL(req.url); const code=url.searchParams.get('code'); if(!code) return NextResponse.redirect(`${env.webBase}/login?error=no_code`); const t=await exchangeCode(code); const user=await getDiscordUser(t.access_token); await supabaseAdmin.from('users').upsert({discord_id:user.id,username:user.username,avatar:user.avatar||null,last_login_at:new Date().toISOString(),is_owner:user.id===env.ownerId},{onConflict:'discord_id'}); await setSession({id:user.id,username:user.username,avatar:user.avatar}); return NextResponse.redirect(`${env.webBase}/dashboard`)}catch(e:any){return NextResponse.json({error:e.message},{status:500})}}
