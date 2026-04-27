import { cookies } from 'next/headers';
import crypto from 'crypto';
import { env } from './env';
export type SessionUser={ id:string; username:string; avatar?:string|null };
function sign(value:string){return crypto.createHmac('sha256',env.sessionSecret).update(value).digest('hex')}
export async function setSession(user:SessionUser){const raw=Buffer.from(JSON.stringify(user)).toString('base64url'); const token=`${raw}.${sign(raw)}`; (await cookies()).set('amc_session',token,{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:60*60*24*14});}
export async function clearSession(){(await cookies()).delete('amc_session')}
export async function getSession():Promise<SessionUser|null>{const token=(await cookies()).get('amc_session')?.value; if(!token)return null; const [raw,sig]=token.split('.'); if(!raw||!sig||sign(raw)!==sig)return null; try{return JSON.parse(Buffer.from(raw,'base64url').toString())}catch{return null}}
