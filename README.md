# Elite Realty Pro (Next.js)

This is the Next.js migration of the Elite Realty Pro real estate app. Run the app and API from a single process.

## Setup

1. **Install dependencies**
   ```bash
   cd next && npm install
   ```

2. **Environment variables**
   - Copy `.env.example` to `.env.local`
   - Set `DATABASE_URL` (PostgreSQL for Prisma)
   - Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for Supabase (optional for auth)
   - Set `GEMINI_API_KEY` or `API_KEY` for the AI chat assistant

3. **Database**
   ```bash
   npm run db:generate
   npm run db:push
   # or: npm run db:migrate
   ```

4. **Assets**
   - Add a hero image at `public/hero.jpg` for the home page hero section (optional; the page will work without it but the image will 404).

## Run

- **Development:** `npm run dev` — app and API at http://localhost:3000
- **Build:** `npm run build`
- **Production:** `npm run start`

## Scripts

- `dev` — Start Next.js dev server (frontend + API routes)
- `build` / `start` — Production build and start
- `db:generate` — Generate Prisma client
- `db:migrate` — Run migrations
- `db:studio` — Open Prisma Studio
- `db:push` — Push schema to DB without migrations

## API routes

All former Express endpoints live under `/api/`:

- `GET/POST /api/properties`, `GET/PUT/DELETE /api/properties/[id]`
- `GET /api/agents`, `GET /api/agents/[id]`
- `GET /api/profiles/[id]`
- `GET/POST /api/users/[userId]/saved-properties`, `DELETE .../saved-properties/[propertyId]`
- `GET/POST /api/messages`
- `POST /api/chat` — Gemini AI assistant (body: `{ "message": "..." }`)
- `GET /api/health`
