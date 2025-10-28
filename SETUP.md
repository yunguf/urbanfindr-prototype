# UrbanFindr Prototype - Setup Guide

This is a functional prototype demonstrating the complete stack: Next.js 14 + Supabase + Authentication + CRUD + RLS.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Git installed
- Vercel account (for deployment)

## Setup Steps

### 1. Clone/Setup the Project

```bash
# If starting fresh, the project is already created
cd urbanfindr-prototype
npm install
```

### 2. Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - Project name: `urbanfindr-prototype`
   - Database password: (save this securely)
   - Region: Choose closest to your users
4. Wait for project to be created (~2 minutes)

### 3. Configure Environment Variables

1. In your Supabase project, go to Settings > API
2. Copy the `Project URL` and `anon/public` key
3. Update `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set Up Database Schema

1. In Supabase Dashboard, go to SQL Editor
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste and click "Run"
5. Verify tables were created: Go to Table Editor, you should see `orders` table

### 5. Configure Authentication

1. In Supabase Dashboard, go to Authentication > Providers
2. **Email provider** (should be enabled by default):
   - Confirm email required: ON (recommended) or OFF (for testing)
   - Secure email change: ON

3. **For Magic Link** (optional but recommended):
   - Already works with email provider
   - No additional configuration needed

4. **Email Templates** (recommended for production):
   - Go to Authentication > Email Templates
   - Customize the confirmation and magic link emails
   - Update Site URL to your production URL

### 6. Configure Site URL (Important!)

1. Go to Authentication > URL Configuration
2. Set Site URL to:
   - Development: `http://localhost:3000`
   - Production: Your Vercel URL (update after deployment)
3. Add Redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://your-vercel-app.vercel.app/auth/callback` (after deployment)

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 8. Test the Application

1. **Sign Up**: Click "Sign Up" tab, enter email and password
   - If email confirmation is enabled, check your email and click the confirmation link
   - If disabled, you'll be signed in immediately

2. **Sign In**: Use the "Sign In" tab with your credentials

3. **Magic Link**: Click "Magic Link" tab, enter email, check inbox for the link

4. **Test CRUD Operations**:
   - Create a new order
   - View your orders list
   - Delete an order
   - Try creating multiple orders

5. **Test RLS** (Multi-user isolation):
   - Open an incognito window
   - Sign up with a different email
   - Create orders - they should NOT be visible to the first user
   - Each user sees only their own orders

## Deployment to Vercel

### Option 1: Via Git (Recommended)

1. Push code to GitHub:
```bash
git add .
git commit -m "Initial prototype build"
git push origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Click "Deploy"

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
# Follow prompts
# Add environment variables when prompted
```

### Post-Deployment

1. Copy your Vercel URL
2. Go back to Supabase > Authentication > URL Configuration
3. Update Site URL to your Vercel URL
4. Add `https://your-app.vercel.app/auth/callback` to Redirect URLs
5. Test authentication on production

## Features Implemented

### Authentication
- Email/password sign up and sign in
- Magic link authentication
- Session management with middleware
- Automatic redirects for authenticated/unauthenticated users
- Secure auth callback handling

### Database
- PostgreSQL via Supabase
- Orders table with full CRUD operations
- UUID primary keys
- Timestamps (created_at, updated_at)
- Foreign key relationship with auth.users

### Row Level Security (RLS)
- Users can only view their own orders
- Users can only create orders for themselves
- Users can only update their own orders
- Users can only delete their own orders
- Database-level security, not application-level

### UI/UX
- Clean, responsive Tailwind CSS design
- Loading states for all async operations
- Error handling and user feedback
- Server Components for data fetching (performance)
- Client Components for interactivity

### Next.js 14 Features
- App Router
- Server Components for data fetching
- Server Actions ready (currently using client-side mutations)
- Middleware for session management
- TypeScript throughout

## Architecture Highlights

### Server-Side Rendering
- `/app/page.tsx` - Server component that checks auth and redirects
- `/app/dashboard/page.tsx` - Server component that fetches user data
- `/app/dashboard/OrdersList.tsx` - Server component that fetches orders

### Client Components
- All forms and interactive elements
- Minimal client-side JavaScript
- Client components only where needed for interactivity

### Supabase Integration
- `@supabase/ssr` for server-side auth
- Separate client/server Supabase instances
- Middleware for session refresh
- Cookie-based session management

## Troubleshooting

### "Invalid API key" error
- Check that `.env.local` has correct values
- Restart dev server after changing env vars
- Verify you copied `anon/public` key, not `service_role` key

### Emails not arriving
- Check Supabase logs: Authentication > Logs
- Check spam folder
- Verify email provider is enabled
- For production, configure custom SMTP in Supabase

### RLS errors "new row violates row-level security"
- Ensure user is authenticated
- Check that `user_id` matches `auth.uid()`
- Verify RLS policies are created correctly

### Redirect loop
- Check middleware configuration
- Verify auth callback route is working
- Clear cookies and try again

### Can't see orders
- Verify RLS policies are set up correctly
- Check that orders have correct `user_id`
- Use Supabase Table Editor to verify data

## Next Steps

### Potential Enhancements
1. Server Actions for mutations (instead of client-side)
2. Real-time subscriptions for orders
3. Order update functionality (currently only create/delete)
4. Pagination for large order lists
5. Search and filtering
6. N8N webhook integration
7. Export to CSV/PDF
8. Email notifications
9. Dashboard analytics
10. Multi-tenant organizations

## Time Tracking

Track your actual time spent on:
- [ ] Initial setup: _____ hours
- [ ] Supabase configuration: _____ hours
- [ ] Authentication implementation: _____ hours
- [ ] Database schema: _____ hours
- [ ] CRUD operations: _____ hours
- [ ] RLS policies: _____ hours
- [ ] UI development: _____ hours
- [ ] Testing: _____ hours
- [ ] Deployment: _____ hours
- [ ] Documentation: _____ hours
- **Total: _____ hours**

## License

MIT - Free to use as template for client projects
