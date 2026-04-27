import { NextResponse } from 'next/server';import { getSession } from '@/lib/session';import { env } from '@/lib/env';
export async function GET(){const user=await getSession(); return NextResponse.json({user, owner:user?.id===env.ownerId})}
