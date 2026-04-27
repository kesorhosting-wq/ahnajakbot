export default function Login(){
 const base=process.env.PUBLIC_BASE_URL||''; const client=process.env.DISCORD_CLIENT_ID||''; const redirect=encodeURIComponent(process.env.DISCORD_REDIRECT_URI||`${base}/api/auth/discord/callback`); const scope=encodeURIComponent('identify guilds'); const url=`https://discord.com/api/oauth2/authorize?client_id=${client}&redirect_uri=${redirect}&response_type=code&scope=${scope}`;
 return <main className="container"><div className="card"><h1>Login with Discord</h1><p className="muted">Only guild owners/admins or configured admins can manage store settings.</p><a className="btn" href={url}>Continue with Discord</a></div></main>
}
