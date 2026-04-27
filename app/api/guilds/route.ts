import { NextResponse } from 'next/server';import { requireUser } from '@/lib/authz';import { supabaseAdmin } from '@/lib/supabase';
export async function GET(){const user=await requireUser(); const {data}=await supabaseAdmin.from('guild_admins').select('guild_id,guild_name,role').eq('discord_user_id',user.id); return NextResponse.json({guilds:data||[]})}
