export const env = {
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseAnon: process.env.SUPABASE_ANON_KEY!,
  supabaseService: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  publicBase: process.env.PUBLIC_BASE_URL!,
  webBase: process.env.WEB_BASE_URL || process.env.PUBLIC_BASE_URL!,
  ownerId: process.env.MAIN_OWNER_DISCORD_ID || '1446502651637534772',
  discordClientId: process.env.DISCORD_CLIENT_ID!,
  discordClientSecret: process.env.DISCORD_CLIENT_SECRET!,
  discordRedirectUri: process.env.DISCORD_REDIRECT_URI!,
  sessionSecret: process.env.SESSION_SECRET || 'dev-change-me',
  khqrApi: process.env.KHQR_API_URL || 'http://157.10.73.20:7777',
  defaultWebhookSecret: process.env.DEFAULT_WEBHOOK_SECRET || 'Jes-dak-dak-mk-ka-pea-ey-jg-hah',
  backendSecret: process.env.BACKEND_INTERNAL_SECRET || 'dev-change-me'
};
