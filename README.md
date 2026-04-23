# Modeon

Modeon is a wardrobe and styling platform built with React and Vite on the frontend and a FastAPI scaffold on the backend. The product covers onboarding, wardrobe management, outfit discovery, shopping workflows, subscription flows, and AI-assisted styling experiences.

## Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite, React Router |
| Styling | Tailwind CSS |
| State | Zustand, TanStack Query |
| Motion | Framer Motion |
| Drag and drop | dnd-kit |
| Auth and data | Supabase |
| Analytics | PostHog |
| Backend scaffold | FastAPI |

## Repository Layout

```text
.
|-- src/                  Frontend application source
|   |-- api/              API integration stubs
|   |-- components/       Reusable UI and feature components
|   |-- constants/        Shared constants
|   |-- hooks/            Custom hooks
|   |-- lib/              Client initialization utilities
|   |-- pages/            Route-level screens
|   `-- stores/           Zustand state stores
|-- public/               Static frontend assets
|-- backend/              FastAPI service scaffold
|   |-- app/
|   |   |-- db/
|   |   |-- models/
|   |   |-- routers/
|   |   `-- services/
|   `-- requirements.txt
`-- .env.example          Frontend environment template
```

## Frontend Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Required frontend environment variables:

| Variable | Description |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase public anon key |
| `VITE_API_BASE_URL` | Backend base URL, for example `http://localhost:8000` |
| `VITE_POSTHOG_KEY` | PostHog project key |

## Backend Setup

See [backend/README.md](backend/README.md) for the backend scaffold, required environment variables, and local startup flow.

## Notes

- The frontend API modules in `src/api/*.api.js` are still scaffolds and need real backend wiring.
- `package-lock.json` is committed so installs remain reproducible.
