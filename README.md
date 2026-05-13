# Aimeega — AI Film Platform

The home of AI cinema. Built with Next.js 15, Supabase, Clerk, and Cloudflare Stream.

---

## Tech Stack

| Layer | Service |
|---|---|
| Framework | Next.js 15 (App Router) |
| Database | Supabase (PostgreSQL) |
| Auth | Clerk |
| Video | Cloudflare Stream |
| Hosting | Vercel |
| Styling | Tailwind CSS |
| Moderation | Hive API |

---

## Setup — Step by Step

### 1. Clone & install

```bash
git clone https://github.com/yourname/aimeega.git
cd aimeega
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in all values in `.env.local` (see below).

### 3. Supabase

1. Go to [supabase.com](https://supabase.com) → New project
2. Copy your Project URL and anon key to `.env.local`
3. Run the migration:

```bash
# In Supabase dashboard → SQL Editor → paste contents of:
supabase/migrations/001_initial_schema.sql
```

### 4. Clerk

1. Go to [clerk.com](https://clerk.com) → Create application
2. Enable Google OAuth
3. Copy publishable key + secret key to `.env.local`
4. In Clerk dashboard → Webhooks → Add endpoint:
   - URL: `https://aimeega.com/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`
5. Copy webhook secret to `.env.local` as `CLERK_WEBHOOK_SECRET`

### 5. Cloudflare Stream

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Stream
2. Copy Account ID to `.env.local`
3. Create API Token with Stream permissions
4. Set webhook URL in Stream settings: `https://aimeega.com/api/webhooks/cloudflare`

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 7. Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Or connect GitHub repo to Vercel dashboard for automatic deploys.

### 8. Domain (aimeega.com)

In Vercel dashboard → Domains → Add `aimeega.com` and `www.aimeega.com`

Vercel will give you DNS records to add in Cloudflare (or Hostnet).

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, signup pages
│   ├── (platform)/       # Protected platform pages
│   │   ├── discover/     # Main feed
│   │   ├── trending/     # Trending videos
│   │   ├── upload/       # Upload wizard
│   │   ├── profile/      # Creator profile
│   │   └── video/        # Video detail page
│   ├── api/              # API routes
│   │   ├── videos/       # Video CRUD
│   │   ├── upload/       # Cloudflare upload URL
│   │   └── webhooks/     # Clerk + Cloudflare webhooks
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Landing page
├── components/
│   ├── video/            # VideoCard, VideoFeed, VideoPlayer
│   ├── layout/           # Sidebar, Topbar
│   └── ui/               # Buttons, inputs, etc.
├── lib/
│   ├── supabase.ts       # DB client
│   ├── cloudflare.ts     # Stream API
│   └── utils.ts          # Helpers
├── types/                # TypeScript types
└── styles/               # Global CSS
supabase/
└── migrations/           # SQL schema
```

---

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_STREAM_API_TOKEN=
NEXT_PUBLIC_CLOUDFLARE_CUSTOMER_SUBDOMAIN=

# App
NEXT_PUBLIC_APP_URL=https://aimeega.com
```

---

## Costs (MVP)

| Service | Cost |
|---|---|
| Vercel | Free |
| Supabase | Free |
| Clerk | Free (up to 10K MAU) |
| Cloudflare Stream | Pay as you go (~€0.01/min) |
| Domain | ~€10/year |
| **Total month 1** | **~€0–20** |
