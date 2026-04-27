create table if not exists users (
  discord_id text primary key,
  username text not null,
  avatar text,
  is_owner boolean default false,
  last_login_at timestamptz,
  created_at timestamptz default now()
);
create table if not exists guild_admins (
  guild_id text not null,
  guild_name text,
  discord_user_id text not null,
  role text default 'admin',
  created_at timestamptz default now(),
  primary key (guild_id, discord_user_id)
);
create table if not exists settings (
  guild_id text primary key,
  description text default 'Welcome to AhnajakMC Store',
  banner_url text,
  logo_url text,
  how_to_use text,
  terms_privacy text,
  admin_role_id text,
  merchant_name text default 'AhnajakMCStore',
  merchant_id text default 'sonmeng_leng@bkrt',
  webhook_secret text,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);
create table if not exists servers (
  id uuid primary key default gen_random_uuid(),
  guild_id text not null,
  name text not null,
  plugin_url text,
  plugin_api_key text,
  enabled boolean default true,
  created_at timestamptz default now()
);
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  guild_id text not null,
  name text not null,
  description text,
  image_url text,
  sort_order int default 0,
  enabled boolean default true,
  created_at timestamptz default now()
);
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  guild_id text not null,
  category_id uuid references categories(id) on delete set null,
  server_id uuid references servers(id) on delete set null,
  name text not null,
  description text,
  image_url text,
  price numeric(10,2) not null default 0,
  commands jsonb default '[]'::jsonb,
  enabled boolean default true,
  created_at timestamptz default now()
);
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  guild_id text not null,
  transaction_id text unique not null,
  discord_user_id text not null,
  minecraft_username text not null,
  product_id uuid references products(id) on delete set null,
  server_id uuid references servers(id) on delete set null,
  amount numeric(10,2) not null,
  status text not null default 'pending',
  payment_hash text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  guild_id text,
  actor text,
  action text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);
create index if not exists idx_categories_guild on categories(guild_id);
create index if not exists idx_products_guild on products(guild_id);
create index if not exists idx_orders_guild on orders(guild_id);
