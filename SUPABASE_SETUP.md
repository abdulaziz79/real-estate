# Supabase Setup Guide

This project uses Supabase for database and authentication.

## Installation

1. Install dependencies:
```bash
npm install
```

## Environment Variables

1. Create a `.env.local` file in the root of the project
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Your Supabase Credentials

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project (or create a new one)
3. Go to Settings > API
4. Copy the following:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon/public key** → `VITE_SUPABASE_ANON_KEY`

## Database Schema

The following tables are expected in your Supabase database:

- `profiles` - User profiles
- `properties` - Property listings
- `agents` - Real estate agents
- `messages` - User messages
- `saved_properties` - User saved properties

See `lib/database.types.ts` for the expected schema structure.

## Usage

Import the Supabase client in your components:

```typescript
import { supabase } from '@/lib/supabase';
```

## Security

- Never commit your `.env.local` file (it's already in `.gitignore`)
- The `anon` key is safe to use in client-side code
- Never expose your `service_role` key in client-side code


