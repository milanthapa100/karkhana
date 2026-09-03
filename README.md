# Karkhana Content System

A GitHub-based content management system. Team members create and update
structured Markdown (`.md`) files. Changes are reviewed through Pull Requests
and, once merged, are automatically shown on the Karkhana website.

GitHub is the source of truth for all content.

## How it works

```
Write Markdown → Branch → Pull Request → Validation → Review → Merge → Website updates
```

- Content lives in [`content/`](content/).
- The website (Next.js) reads the merged Markdown from GitHub and renders it.
- Validation runs automatically on every Pull Request.

## Repository layout

```
karkhana/
├── content/                 # Markdown content (source of truth)
│   └── updates/
├── src/                     # Next.js website source
├── scripts/                 # local validation helpers
├── .github/workflows/       # CI: validate + deploy
├── schema.json              # content validation schema
└── REQUIREMENTS.md          # original system requirements
```

## Quick start

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Validate content locally:

```bash
npm run validate
```

## Docs

- [REQUIREMENTS.md](REQUIREMENTS.md) — the original system specification.
- [BUILD_PLAN.md](BUILD_PLAN.md) — detailed build plan and architecture.
- [CONTRIBUTING.md](CONTRIBUTING.md) — how to contribute content.
