import { getSession } from './session';
import { env } from './env';
export async function requireUser(){const u=await getSession(); if(!u) throw new Error('Unauthorized'); return u}
export function isMainOwner(id:string){return id===env.ownerId}
