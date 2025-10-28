# UrbanFindr Prototype

A fully functional prototype built to validate the Next.js 14 + Supabase tech stack for rapid client project development.

## What This Demonstrates

This prototype proves that the stack can deliver:

- **Authentication**: Email/password + Magic link (both working)
- **Database**: PostgreSQL with proper schema and relationships
- **Security**: Row Level Security (RLS) - users only see their own data
- **CRUD**: Full Create, Read, Delete operations for orders
- **Modern Stack**: Next.js 14 App Router + Server Components + TypeScript
- **Production Ready**: Deployable to Vercel in minutes

## Live Demo

[Coming soon - will be deployed to Vercel]

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Supabase
See [SETUP.md](./SETUP.md) for detailed instructions.

Quick version:
1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Copy `.env.local` template and add your Supabase URL and anon key
3. Run the SQL from `supabase/schema.sql` in Supabase SQL Editor

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (@supabase/ssr)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Key Features

### Authentication System
- Email/password registration and login
- Magic link authentication
- Session management via middleware
- Protected routes
- Automatic redirects

### Database Design
- Orders table with proper relationships
- UUID primary keys
- Automatic timestamps
- Foreign key to auth.users

### Row Level Security
- Database-level security (not app-level)
- Users isolated from each other
- Secure by default
- No accidental data leaks

### Modern Architecture
- Server Components for data fetching
- Client Components only where needed
- Middleware for auth
- Type-safe throughout

## Project Structure

```
urbanfindr-prototype/
├── app/
│   ├── auth/callback/     # Auth callback handler
│   ├── dashboard/         # Protected dashboard
│   │   ├── page.tsx      # Dashboard page (Server Component)
│   │   ├── OrdersList.tsx # Orders list (Server Component)
│   │   ├── AddOrderForm.tsx # Add order form (Client Component)
│   │   ├── DeleteOrderButton.tsx # Delete button (Client Component)
│   │   └── LogoutButton.tsx # Logout button (Client Component)
│   ├── login/            # Login/signup page
│   └── page.tsx          # Home (redirects)
├── lib/
│   └── supabase/         # Supabase client utilities
│       ├── client.ts     # Browser client
│       ├── server.ts     # Server client
│       └── middleware.ts # Middleware client
├── middleware.ts         # Auth middleware
├── supabase/
│   └── schema.sql        # Database schema + RLS policies
├── SETUP.md              # Detailed setup guide
└── .env.local            # Environment variables (not in git)
```

## What Was Built (Timeline)

This prototype validates the development timeline:

- **Phase 1**: Setup + Auth (Target: 1-2 days) ✅
- **Phase 2**: Database + CRUD + RLS (Target: 2-3 days) ✅
- **Phase 3**: Dashboard UI (Target: 1-2 days) ✅
- **Phase 4**: Deployment + Docs (Target: 1 day) ⏳

## Reusability Assessment

Components ready for reuse in client projects:
- ✅ Supabase client setup (100% reusable)
- ✅ Auth system (95% reusable - just update branding)
- ✅ Middleware pattern (100% reusable)
- ✅ RLS policy patterns (100% reusable)
- ✅ CRUD patterns (90% reusable - adapt to different entities)
- ✅ Dashboard layout (80% reusable - update styling)

**Estimated reusability: 85-90% of code can be templated**

## Testing Multi-User RLS

1. Sign up as User A
2. Create some orders
3. Open incognito window
4. Sign up as User B
5. Create different orders
6. Verify User A cannot see User B's orders (and vice versa)

## Deployment

See [SETUP.md](./SETUP.md) for deployment instructions.

Quick deploy to Vercel:
```bash
vercel
```

## Documentation

- [SETUP.md](./SETUP.md) - Complete setup and deployment guide
- [supabase/schema.sql](./supabase/schema.sql) - Database schema with comments

## What's Next

This prototype proves the core stack works. Next client projects can:
1. Clone this repo as a template
2. Customize the entity (orders → properties, listings, etc.)
3. Update branding and styling
4. Add business-specific features
5. Deploy in hours/days, not weeks

## License

MIT - Use freely as a template for client projects
