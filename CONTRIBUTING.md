# Contributing

Thank you for contributing content to Karkhana. Please follow this workflow so
changes stay consistent and traceable.

## 1. Before you start

- Make sure you can clone the repository.
- Read the [Markdown requirements](README.md) section below.
- Understand what you are updating (assigned task, update, etc.).

## 2. Create a branch

Always work on a branch, never directly on `main`.

```bash
git checkout main
git pull
git checkout -b <person>/<action>-<description>
```

Examples:

- `milan/update-project`
- `milan/add-resource`
- `milan/update-profile`

## 3. Edit / create Markdown

- Put updates under `content/updates/`.
- Use the filename-to-title slug convention: lowercase, hyphens, e.g.
  `github-content-system.md`.
- Follow the frontmatter fields in `schema.json`:

```yaml
---
title: GitHub Content System
author: Milan
date: 2026-08-31
category: update
status: in-progress
---
```

- Include `## Description`, `## Progress`, and `## Next Steps` sections.
- `date` uses `YYYY-MM-DD`.

## 4. Validate locally

```bash
npm install
npm run validate
```

Fix any errors before committing.

## 5. Commit and push

```bash
git add .
git commit -m "update: add summary of the change"
git push -u origin <branch-name>
```

## 6. Open a Pull Request

Use the PR template. Include:

- A clear title.
- A description of the changes.
- Any related task/ticket.
- Testing information.
- The contributor checklist.

Validation runs automatically on the PR. Fix any failing checks and re-push.

## 7. Merge

A reviewer must approve the PR. Once approved, the maintainer merges it into
`main`. The website then updates automatically.
