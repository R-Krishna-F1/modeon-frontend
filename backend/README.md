# Modeon Backend

This folder contains the FastAPI scaffold for the Modeon backend. It lays out the service boundaries, router split, models, and expected integrations, but it is still a starter implementation rather than a production backend.

## Architecture

| Layer | Technology |
| --- | --- |
| Framework | FastAPI, Uvicorn |
| Auth | Supabase Auth with JWT validation |
| Database | Supabase PostgreSQL with row-level security |
| File storage | Azure Blob Storage |
| AI services | Azure OpenAI |
| Image processing | `rembg` and custom CV pipeline |
| Payments | Stripe |
| Export | Pillow |

## Layout

```text
app/
|-- main.py           FastAPI bootstrap and router registration
|-- config.py         Environment-backed settings
|-- dependencies.py   Shared request dependencies
|-- routers/          Route modules by feature area
|-- services/         Business logic and external integrations
|-- models/           Request and response models
`-- db/               Database client and schema
```

## Required Environment Variables

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
AZURE_BLOB_CONNECTION_STRING=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_DEPLOYMENT_GPT4O=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
ALLOWED_ORIGINS=http://localhost:3000
```

## Local Run

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
