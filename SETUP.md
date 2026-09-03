# Karkhana — Deployment Setup

Your `main` branch is protected and you merge Pull Requests yourself. This
guide covers the one remaining piece to make content show up on the live
website: deploying the Next.js site so every merge to `main` rebuilds it.

---

## 1. Deploy the website (Vercel — recommended)

The website is a Next.js app at the repo root. Deploying it to Vercel makes it
world-accessible and auto-rebuilds on every merge to `main` — so approved
content appears automatically.

### Steps

1. Sign up / log in at https://vercel.com (recommend connecting your GitHub
   account).
2. **Add New → Project → Import** the `karkhana` repository.
3. **Important — set the Framework to Next.js.** When the project was first
   imported, `main` had no `package.json`, so Vercel did **not** detect Next.js
   and set the project up as a *static* site (this is why the first deploys
   returned empty/404). Fix it in the project:

   - **Settings → General → Framework Preset → Next.js**
   - Ensure **Root Directory** is `/` (leave blank / root).
   - Build Command should default to `next build`, Output to `.next`.

4. **Redeploy.** Open **Deployments → … → Redeploy** (or push a commit to
   `main`).
5. The site appears at `https://<project>.vercel.app`. On the home page you
   should see the `GitHub Content System` update card.
6. (Optional) Add a custom domain in **Settings → Domains**.

### After a merge

Every merge to `main` triggers a rebuild on Vercel. Because the content lives
in the same repo (`content/`), the rebuilt site includes the new/updated
Markdown automatically. No manual step needed.

---

## 2. Verify the pipeline end to end

With `main` protected and Vercel connected, the loop is:

```
Contributor creates branch
  → edits Markdown under content/
  → pushes
  → opens Pull Request   [Validate check runs automatically]
  → you review
  → you merge
  → Vercel rebuilds
  → update is live with its date
```

Quick check after the first deployment: open your Vercel URL, confirm
`content/updates/github-content-system.md` shows up as a card on the home page
and renders fully on `/updates/github-content-system` with its date.

---

## 3. Optional hardening (later)

- **Strict branch protection:** require the `validate` check to pass before
  merge, and require one review. This blocks invalid content from reaching
  `main` even if someone skips local checks.
- **Auto-preview per PR:** Vercel gives each PR its own preview URL, so you can
  see the rendered result *before* merging.
- **More content types:** add `projects`, `people`, `events`, `resources`
  folders and extend `schema.json` accordingly.
