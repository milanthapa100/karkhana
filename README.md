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

## Content types

| Type            | Location           | Purpose                                             |
|-----------------|--------------------|-----------------------------------------------------|
| `update`        | `content/updates/` | Progress reports and announcements                  |
| `sop`           | `content/sops/`    | Standard Operating Procedures with a step checklist |

SOP files are standard Markdown. They use the frontmatter fields `title`,
`author`, `date`, `category`, `status`, `summary`, and `owner`, and the body
contains a `## Steps` section whose checklist items render as tick-boxes on
the website.

## Repository layout

```
karkhana/
├── content/                 # Markdown content (source of truth)
│   ├── updates/
│   └── sops/
├── public/                  # static assets (logo, etc.)
├── src/                     # Next.js website source
├── scripts/                 # local validation helpers
├── .github/workflows/       # CI: validate + deploy
└── schema.json              # content validation schema
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

- [CONTRIBUTING.md](CONTRIBUTING.md) — how to contribute content.
