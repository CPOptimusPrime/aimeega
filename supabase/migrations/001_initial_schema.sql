-- ─── Enable extensions ───────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm"; -- for full-text search

-- ─── Profiles ─────────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid primary key default uuid_generate_v4(),
  clerk_id text unique not null,
  username text unique not null,
  display_name text not null,
  bio text,
  avatar_url text,
  banner_url text,
  role text not null default 'viewer' check (role in ('viewer','creator','studio','admin')),
  verified boolean not null default false,
  country text,
  ai_tools text[] not null default '{}',
  genres text[] not null default '{}',
  follower_count integer not null default 0,
  following_count integer not null default 0,
  video_count integer not null default 0,
  total_views bigint not null default 0,
  total_earnings numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Videos ───────────────────────────────────────────────────────────────────
create table public.videos (
  id uuid primary key default uuid_generate_v4(),
  uploader_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'pending' check (status in ('pending','processing','live','rejected','draft')),
  -- Cloudflare Stream
  cf_uid text unique,
  cf_thumbnail text,
  cf_duration integer,
  cf_ready_to_stream boolean not null default false,
  -- Metadata
  genre text not null,
  ai_tool text not null,
  music_source text,
  voice_source text,
  has_real_people boolean not null default false,
  has_brand_ip boolean not null default false,
  -- Stats
  view_count bigint not null default 0,
  like_count integer not null default 0,
  comment_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Full text search index
create index videos_title_search on public.videos using gin(to_tsvector('dutch', title));
create index videos_status_idx on public.videos(status);
create index videos_genre_idx on public.videos(genre);
create index videos_uploader_idx on public.videos(uploader_id);
create index videos_views_idx on public.videos(view_count desc);
create index videos_created_idx on public.videos(created_at desc);

-- ─── Comments ─────────────────────────────────────────────────────────────────
create table public.comments (
  id uuid primary key default uuid_generate_v4(),
  video_id uuid not null references public.videos(id) on delete cascade,
  author_id uuid not null references public.profiles(id) on delete cascade,
  parent_id uuid references public.comments(id) on delete cascade,
  content text not null check (char_length(content) between 1 and 2000),
  like_count integer not null default 0,
  created_at timestamptz not null default now()
);

create index comments_video_idx on public.comments(video_id, created_at desc);

-- ─── Likes ────────────────────────────────────────────────────────────────────
create table public.likes (
  user_id uuid not null references public.profiles(id) on delete cascade,
  video_id uuid not null references public.videos(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, video_id)
);

-- ─── Saves (bookmarks) ────────────────────────────────────────────────────────
create table public.saves (
  user_id uuid not null references public.profiles(id) on delete cascade,
  video_id uuid not null references public.videos(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, video_id)
);

-- ─── Follows ──────────────────────────────────────────────────────────────────
create table public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  following_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id),
  check (follower_id != following_id)
);

-- ─── Notifications ────────────────────────────────────────────────────────────
create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('follow','like','comment','milestone','payout','approved')),
  actor_id uuid references public.profiles(id) on delete set null,
  video_id uuid references public.videos(id) on delete cascade,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create index notifications_user_idx on public.notifications(user_id, read, created_at desc);

-- ─── Views (for tracking) ─────────────────────────────────────────────────────
create table public.views (
  id uuid primary key default uuid_generate_v4(),
  video_id uuid not null references public.videos(id) on delete cascade,
  viewer_id uuid references public.profiles(id) on delete set null,
  ip_hash text, -- hashed for privacy
  watched_seconds integer not null default 0,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);

create index views_video_idx on public.views(video_id, created_at desc);

-- ─── Auto-update updated_at ───────────────────────────────────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function update_updated_at();
create trigger videos_updated_at before update on public.videos
  for each row execute function update_updated_at();

-- ─── Auto-update follower/following counts ───────────────────────────────────
create or replace function sync_follow_counts()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    update public.profiles set follower_count = follower_count + 1 where id = NEW.following_id;
    update public.profiles set following_count = following_count + 1 where id = NEW.follower_id;
  elsif TG_OP = 'DELETE' then
    update public.profiles set follower_count = follower_count - 1 where id = OLD.following_id;
    update public.profiles set following_count = following_count - 1 where id = OLD.follower_id;
  end if;
  return null;
end;
$$ language plpgsql;

create trigger follows_count_sync after insert or delete on public.follows
  for each row execute function sync_follow_counts();

-- ─── Auto-update like counts ─────────────────────────────────────────────────
create or replace function sync_like_counts()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    update public.videos set like_count = like_count + 1 where id = NEW.video_id;
  elsif TG_OP = 'DELETE' then
    update public.videos set like_count = like_count - 1 where id = OLD.video_id;
  end if;
  return null;
end;
$$ language plpgsql;

create trigger likes_count_sync after insert or delete on public.likes
  for each row execute function sync_like_counts();

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.videos enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;
alter table public.saves enable row level security;
alter table public.follows enable row level security;
alter table public.notifications enable row level security;

-- Profiles: public read, own write
create policy "profiles_public_read" on public.profiles for select using (true);
create policy "profiles_own_insert" on public.profiles for insert with check (auth.uid()::text = clerk_id);
create policy "profiles_own_update" on public.profiles for update using (auth.uid()::text = clerk_id);

-- Videos: public read live, own all
create policy "videos_public_read" on public.videos for select using (status = 'live' or uploader_id in (select id from public.profiles where clerk_id = auth.uid()::text));
create policy "videos_own_insert" on public.videos for insert with check (uploader_id in (select id from public.profiles where clerk_id = auth.uid()::text));
create policy "videos_own_update" on public.videos for update using (uploader_id in (select id from public.profiles where clerk_id = auth.uid()::text));

-- Comments: public read, auth write
create policy "comments_public_read" on public.comments for select using (true);
create policy "comments_auth_insert" on public.comments for insert with check (author_id in (select id from public.profiles where clerk_id = auth.uid()::text));

-- Likes/Saves/Follows: own only
create policy "likes_own" on public.likes using (user_id in (select id from public.profiles where clerk_id = auth.uid()::text));
create policy "saves_own" on public.saves using (user_id in (select id from public.profiles where clerk_id = auth.uid()::text));
create policy "follows_public_read" on public.follows for select using (true);
create policy "follows_own_write" on public.follows for insert with check (follower_id in (select id from public.profiles where clerk_id = auth.uid()::text));
create policy "follows_own_delete" on public.follows for delete using (follower_id in (select id from public.profiles where clerk_id = auth.uid()::text));

-- Notifications: own only
create policy "notifications_own" on public.notifications using (user_id in (select id from public.profiles where clerk_id = auth.uid()::text));
