# AhnajakMC Store — Public Invite Bot + One Vercel Website

Free public Discord shop bot for Minecraft servers.

## Architecture

- One Next.js website on Vercel:
  - Admin panel
  - Discord OAuth callback
  - KHQR payment callback
  - Supabase API routes
- One Discord bot process:
  - Can run on Railway/Render/Fly/VPS/your PC
  - Uses the same Vercel website APIs
- Supabase database
- Future Minecraft plugin handles actual reward delivery/offline queue.

## Setup

```bash
npm install
cp .env.example .env.local
```

Put your new rotated secrets in `.env.local`.

## Supabase

Open Supabase SQL Editor and run:

```sql
-- paste supabase/schema.sql
```

## Vercel env

Add the same variables from `.env.example` to Vercel Project Settings → Environment Variables.

For one Vercel website, use:

```env
PUBLIC_BASE_URL=https://ahnajakmc-store-supabase-v2.vercel.app
WEB_BASE_URL=https://ahnajakmc-store-supabase-v2.vercel.app
BACKEND_INTERNAL_URL=https://ahnajakmc-store-supabase-v2.vercel.app
DISCORD_REDIRECT_URI=https://ahnajakmc-store-supabase-v2.vercel.app/api/auth/discord/callback
```

## Discord Developer Portal

OAuth2 redirect URL:

```txt
https://ahnajakmc-store-supabase-v2.vercel.app/api/auth/discord/callback
```

Invite URL is shown on the home page.

## Run website locally

```bash
npm run dev
```

## Deploy website to Vercel

```bash
npm i -g vercel
vercel login
vercel
```

## Run bot

```bash
npm run bot
```

For production bot hosting, use Railway/Render/VPS. Vercel is not good for a 24/7 Discord websocket bot.

## Admin flow

1. Invite bot to any server.
2. Login website with Discord.
3. Run `/setup` in your Discord server.
4. Configure settings/categories/products in the dashboard.
5. Users click category/product buttons and pay KHQR.

## Security notes

- Rotate any secrets you pasted into chat.
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to browser code.
- Keep `BACKEND_INTERNAL_SECRET` strong.
- Future plugin must verify plugin API key and prevent duplicate transaction delivery.
