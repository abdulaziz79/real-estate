# Prisma Setup Guide

This project uses Prisma with Supabase PostgreSQL for database operations.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Generate Prisma Client:
```bash
npm run db:generate
```

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
# Supabase (Frontend - for Auth, Real-time, Storage)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database (Backend - for Prisma)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

## Getting Your Database URL

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project
3. Go to **Settings > Database**
4. Under "Connection string", select **"Transaction"** or **"Session"** mode
5. Copy the connection string
6. Replace `[YOUR-PASSWORD]` with your database password
7. Replace `[YOUR-PROJECT-REF]` with your project reference

### Example:
```
DATABASE_URL=postgresql://postgres.xxxxx:your_password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Note:** Use the **Transaction** mode connection string (port 5432) or **Session** mode (port 6543 with pooler) for Prisma.

## Database Setup

1. Run migrations to create tables:
```bash
npm run db:migrate
```

Or push schema directly (for development):
```bash
npm run db:push
```

2. Open Prisma Studio to view/edit data:
```bash
npm run db:studio
```

## Running the Application

Run both frontend and backend with one command:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000 (Vite)
- **Backend API**: http://localhost:3001 (Express + Prisma)

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property
- `GET /api/agents` - Get all agents
- `GET /api/agents/:id` - Get agent by ID
- `GET /api/profiles/:id` - Get user profile
- `GET /api/users/:userId/saved-properties` - Get saved properties
- `POST /api/users/:userId/saved-properties` - Save property
- `DELETE /api/users/:userId/saved-properties/:propertyId` - Unsave property
- `GET /api/messages` - Get messages (query params: userId, receiverId)
- `POST /api/messages` - Create message

## Architecture

- **Frontend**: React + Vite (port 3000)
  - Uses Supabase Client for auth, real-time, storage
  - Calls backend API for database operations

- **Backend**: Express + Prisma (port 3001)
  - Handles all database operations via Prisma
  - RESTful API endpoints

## Important Notes

1. **Supabase Client** is still used for:
   - Authentication
   - Real-time subscriptions
   - Storage (file uploads)

2. **Prisma** is used for:
   - Database queries
   - Migrations
   - Type-safe database access

3. Both can coexist - use Supabase Client for auth/real-time, Prisma for data operations.


