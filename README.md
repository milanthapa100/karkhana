# Karkhana Content System

A GitHub-based content management system. Team members create and update
structured Markdown (`.md`) files. Changes are reviewed through Pull Requests
and, once merged, are served from the department's internal server.

GitHub is the source of truth for all content.

## How it works

```
Write Markdown → Branch → Pull Request → Validation → Review → Merge → Build on server PC → Website updates
```

- Content lives in [`content/`](content/).
- The website (Next.js) is built from the merged Markdown and served from an
  office PC on the department network.
- Validation runs automatically on every Pull Request.

## Content types

| Type            | Location           | Purpose                                             |
|-----------------|--------------------|-----------------------------------------------------|
| `update`        | `content/updates/` | Progress reports and announcements                  |
| `sop`           | `content/sops/`    | Standard Operating Procedures with step-by-step instructions |

SOP files are standard Markdown. They use the frontmatter fields `title`,
`author`, `date`, `category`, `status`, `summary`, and `owner`, and the body
contains a `## Steps` section with the step-by-step procedure.

## Repository layout

```
karkhana/
├── content/                 # Markdown content (source of truth)
│   ├── updates/
│   └── sops/
├── public/                  # static assets (logo, etc.)
├── src/                     # Next.js website source
├── scripts/                 # local validation helpers
├── .github/workflows/       # CI: content validation
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
