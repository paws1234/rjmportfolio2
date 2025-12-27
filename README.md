# Minimal Portfolio (Next.js + Tailwind + Context + Gemini)

## Quickstart (Local)
```bash
npm install
cp .env.example .env.local
# put your GEMINI_API_KEY in .env.local
npm run dev
```

Open http://localhost:3000

## Docker (recommended)
```bash
cp .env.example .env.local
# put GEMINI_API_KEY in .env.local
docker compose up --build
```

## Notes
- Chat uses `/api/chat` and injects resume context from `data/resume.ts`
- Update content in `data/resume.ts` only (single source of truth)
# rjmportfolio2
