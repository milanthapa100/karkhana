# Karkhana Content System — Build Plan

This document turns `REQUIREMENTS.md` into a concrete, buildable system. It
describes the architecture, the chosen stack, the repo layout, the content
workflow, the validation pipeline, the website, and a phased build order with
verifiable acceptance criteria for each phase.

---

## 0. Recommended Architecture (at a glance)

A single repository ("monorepo") holds everything:

```
karkhana/
├── content/                  # Markdown content (source of truth)
│   └── updates/
│       └── example.md
├── src/                      # Next.js website source
│   └── ...                   (App Router, TypeScript)
├── scripts/                  # local validation helpers
├── .github/workflows/        # CI: validate + deploy
├── package.json              # shared scripts at root (optional)
├── schema.json               # content validation schema
└── README.md / CONTRIBUTING.md
```

Why a monorepo (single repo instead of two):

- One place for content, code, and automation — good for a small team.
- One repo to protect, one place for PRs and branch policies.
- Content edits and site deploys both trigger from the same repo.
- Risk is contained: only a handful of people touch it, not thousands.

---

## 1. Technology Stack

### Website (karkhana-web)
- **Framework:** Next.js with the App Router (the `.gitignore` already lists
  Next.js/TypeScript files, so this matches the existing intent).
- **Language:** TypeScript (strict).
- **Styling:** Tailwind CSS (optional but convenient for a clean UI).
- **Markdown parsing:** `gray-matter` (frontmatter) + `react-markdown` /
  `remark-gfm` (rendering). For raw HTML content use `rehype-raw` only when
  trusted.
- **Content fetching:** GitHub REST API (`api.github.com`) via
  `@octokit/rest`, or plain `fetch` against `raw.githubusercontent.com`.

### Hosting
- **Recommended: Vercel** — zero-config for Next.js, free tier, automatic
  deploy on push to `main`, and it supports the "fetch content at runtime
  with on-demand revalidation (ISR)" pattern.
- Alternative: GitHub Pages (static only) if you prefer staying fully inside
  GitHub; this needs a build step that pulls content because there is no
  server-side runtime.
- Alternative: self-host on the Karkhana PC (more control, more upkeep).

### CI / Automation
- **GitHub Actions** for validation and deploy.

---

## 2. Repository Layout (proposed)

```
karkhana/
├── content/                             # Markdown, source of truth
│   └── updates/                         # current prototype content type
│       └── example.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                     # home: list of updates
│   │   ├── updates/
│   │   │   └── [slug]/page.tsx          # individual update page
│   │   └── api/
│   │       └── content/route.ts         # (optional) content JSON API
│   ├── lib/
│   │   ├── content.ts                   # fetch + parse markdown via GitHub
│   │   ├── schema.ts                    # zod schema mirroring content rules
│   │   └── date.ts                      # date helpers
│   └── components/
│       └── UpdateCard.tsx               # card for the list page
├── scripts/
│   └── validate.mjs                     # local validation runner (Node)
├── schema.json                          # validation rules (shared)
├── .github/
│   └── workflows/
│       ├── validate.yml                 # run on every PR
│       └── deploy.yml                   # deploy on merge to main
├── .markdownlint.json                   # markdown style rules
├── package.json
├── README.md
├── CONTRIBUTING.md
└── REQUIREMENTS.md
```

Note: the existing `karkhana-web/` folder can be repurposed as the root of the
Next.js app, or its contents moved up to `src/`. Recommendation: **move the
Next.js app up to the repo root** (`src/`, `package.json`, etc.) so the whole
repo is one deployable unit. If you prefer to keep `karkhana-web/` as the app
root, adjust the deployment `rootDirectory` in Vercel accordingly.

---

## 3. Content Model

### Frontmatter fields (from REQUIREMENTS.md)

Every file under `content/` must have YAML frontmatter:

```yaml
---
title: GitHub Content System
author: Milan
date: 2026-08-31
category: update
status: in-progress
---
```

Field rules:

| Field    | Type   | Required | Allowed values / format                        |
|----------|--------|----------|------------------------------------------------|
| title    | string | yes      | non-empty                                      |
| author   | string | yes      | non-empty, one of known author names (optional)|
| date     | string | yes      | `YYYY-MM-DD`, must be a valid calendar date    |
| category | string | yes      | `update` (later: `project`, `people`, etc.)    |
| status   | string | yes      | `draft`, `in-progress`, `done`, `published`    |

Body conventions (from REQUIREMENTS.md):
- `# <Title>`
- `## Description`
- `## Progress`
- `## Next Steps`

File location: `content/<category>/<slug>.md` where slug is lowercase,
hyphen-separated, and matches the frontmatter `title` when slugified.

---

## 4. Content Workflow (as implemented by the system)

```
Task
  ↓
Contributor clones repo, pulls main
  ↓
Creates branch: <person>/<action>-<description>
  e.g. milan/add-event
  ↓
Edits / creates Markdown under content/
  ↓
Runs local validation: npm run validate
  ↓
Commit
  ↓
Push branch
  ↓
Open Pull Request  (title, description, task link, testing info, checklist)
  ↓
[Automated Validation job runs]  →  fails PR if content invalid
  ↓
Reviewer reviews, requests changes if needed
  ↓
Approval
  ↓
Merge into main (protected branch)
  ↓
[Deploy job runs]  →  builds + deploys website
  ↓
Website revalidates content and shows the update
```

---

## 5. Validation & Automation

### 5.1 What gets validated on every PR (`.github/workflows/validate.yml`)

Trigger: `pull_request` targeting `main`.

Checks:
1. **Frontmatter schema** — validate required fields, allowed categories,
   allowed status values, and that `date` is a real `YYYY-MM-DD` calendar
   date. Implement with a small Node script (`scripts/validate.mjs`) using
   `gray-matter` + a schema, OR the `frontmatter-lint` action
   (`ssg-production/frontmatter-lint@v1`) with a custom schema file. A custom
   Node script is recommended for full control and zero external action risk.
2. **File location** — the file must be under `content/<allowed-category>/`.
3. **File name** — slug must match lowercase-hyphen pattern and match the
   title.
4. **Markdown style** — run `markdownlint` on changed `.md` files.
5. **Required sections** — body must contain `## Description`, `## Progress`,
   `## Next Steps` (per current template; relax as content types grow).
6. **Only validate changed files** for speed: use
   `git diff --name-only origin/main...HEAD`.

Permissions needed for the validate job: `contents: read`, `pull-requests: write`
(so it can post PR comments/annotations on failure).

### 5.2 Local validation (`scripts/validate.mjs` + `npm run validate`)

Mirror the same checks locally so contributors catch issues before pushing.
Use a shared `schema.json` so local and CI stay in sync (single source of truth
for rules).

### 5.3 Deployment (`.github/workflows/deploy.yml`)

Trigger: push/merge to `main`.

Option A (recommended, Git actions driven + Vercel): add a Vercel webhook or a
lightweight deploy workflow. With Vercel's GitHub integration, deployment is
automatic on push to `main` — a custom workflow is usually unnecessary.

Option B (fully self-managed): workflow builds the Next.js site (`next build`),
then deploys the output to a static host or the Karkhana PC.

---

## 6. Website Design

### 6.1 How the site reads content

**Recommended approach: fetch from the GitHub API at runtime with
on-demand revalidation (ISR).**

- The site does **not** bundle content at build time.
- It calls the GitHub API to list and read Markdown files from `main`.
- It caches responses and revalidates on-demand (via a revalidation webhook /
  the GitHub Actions `deploy.yml` success event, or `revalidate: 0` dynamic
  rendering in the simplest case).
- Result: after a merge, the site reflects new content **without a manual
  rebuild** — matching the "automatically reflect approved changes" requirement.

Implementation sketch (`src/lib/content.ts`):

```ts
import matter from "gray-matter";

const OWNER = "milanthapa100";
const REPO = "karkhana";
const BRANCH = "main";

export async function listUpdates() {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/content/updates?ref=${BRANCH}`,
  );
  const files = await res.json();
  const posts = await Promise.all(
    files
      .filter((f) => f.name.endsWith(".md"))
      .map(async (f) => {
        const raw = await (await fetch(f.download_url)).text();
        const { data } = matter(raw);
        return { slug: f.name.replace(/\.md$/, ""), ...data };
      }),
  );
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}
```

Note: for the prototype, the public repo needs no token. If the repo becomes
private, use a fine-grained token scoped to `Contents: Read` for that repo and
store it as an environment variable (`GITHUB_TOKEN`) in Vercel.

### 6.2 Pages

- `/` — homepage listing updates (title, author, formatted date, status),
  newest first.
- `/updates/[slug]` — full rendered Markdown with `react-markdown` + `remark-gfm`,
  showing metadata (title, author, date, category, status) and content.
- Optional `/api/content` JSON endpoint mirroring the fetch for reuse/testability.

### 6.3 Date formatting

- Internal: `YYYY-MM-DD` (kept in frontmatter).
- Display: human readable, e.g. `31 August 2026` (format with `Intl.DateTimeFormat`).

---

## 7. GitHub Settings (Repo Configuration)

1. **Branch protection on `main`:**
   - Require pull request reviews (1 required).
   - Require status checks to pass (the validation workflow).
   - Disallow direct pushes to `main`.
2. **Required checks:** the validate job must pass before merge.
3. **Team / roles:**
   - Everyone else: `Write` on branches but not `main` (branch protection covers this).
   - Reviewer(s) / Maintainer(s): rights to merge protected PRs.
4. **Vercel integration:** import the repo, set framework to Next.js, add
   environment variables (`GITHUB_TOKEN` if private repo).

---

## 8. Phased Build Order

Build in phases, each with a clear done-criterion so work is verifiable.

### Phase 0 — Foundation (repo hygiene)
- [ ] Decide final layout: move `karkhana-web/` content up to repo root (or
      configure Vercel `rootDirectory`).
- [ ] Create root `package.json`, `.gitignore` (already exists in karkhana-web),
      `README.md`, `CONTRIBUTING.md`.
- Done when: clean `main`, a contributor can clone and run anything documented.

### Phase 1 — Content + Validation pipeline (no website yet)
- [ ] Formalize `schema.json` + `scripts/validate.mjs`.
- [ ] Add `npm run validate` (local).
- [ ] Add `.github/workflows/validate.yml` (PR gate).
- [ ] Protect `main` branch; require Validate check + 1 review.
- Done when: a PR with bad frontmatter **fails** CI with clear errors; a PR with
  good content passes and merges.

### Phase 2 — Website reads content (static render from GitHub)
- [ ] Scaffold Next.js App Router app at the root.
- [ ] Implement `src/lib/content.ts` (fetch + parse).
- [ ] Build `/` list page and `/updates/[slug]` page.
- [ ] Style update cards and the detail page; format dates correctly.
- Done when: local `npm run dev` shows the merged `example.md` with correct
  title, author, date, category, status.

### Phase 3 — Auto-deploy + ISR (end-to-end automation)
- [ ] Connect Vercel (or GitHub Pages) deploy on push to `main`.
- [ ] Enable on-demand revalidation so merged content updates the live site
      without manual rebuild.
- Done when: merge a PR → live site updates within a minute.

### Phase 4 — Contributor X and hardening
- [ ] Write `CONTRIBUTING.md` with the end-to-end guide (branch, edit, validate,
      PR, checklist).
- [ ] Add PR template (`.github/pull_request_template.md`) with checklist.
- [ ] Add author list / category enum to schema; enforce.
- Done when: a brand-new contributor can follow the docs and ship content in a
  PR that passes all checks.

### Phase 5 — Future content types & scale (aligned with REQUIREMENTS.md)
- [ ] Add `projects/`, `people/`, `resources/`, `events/` schema variants.
- [ ] Generalize the list/detail pages per category.
- Done when: multiple content categories render correctly with per-category
  validation.

---

## 9. Open Decisions to Confirm

These materially affect implementation; decide before Phase 3:

1. **Final repo layout** — Next.js app at repo root vs. kept in `karkhana-web/`.
2. **Hosting** — Vercel (recommended) vs. GitHub Pages vs. local Karkhana PC.
3. **Public vs. private repo** — public needs no token; private needs a scoped
   `GITHUB_TOKEN`. (Currently `milanthapa100/karkhana` is public.)
4. **Version control approach** — keep the existing single-repo monorepo style
   (recommended for this team size) versus splitting content and web into two
   repos later.

---

## 10. Recommended Immediate Next Steps

1. Decide the 4 open decisions above (start with: monorepo = yes, Vercel = yes,
   repo stays public for now).
2. Phase 0: reorganize layout, add root `package.json` + `README.md`.
3. Phase 1: add `schema.json`, `scripts/validate.mjs`, and the validate workflow;
   protect `main`.
4. Phase 2: scaffold the Next.js app and get it rendering `content/updates/`.
5. Phase 3: connect Vercel and enable revalidation to close the loop.
