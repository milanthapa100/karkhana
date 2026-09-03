---
title: GitHub Content System
author: Milan
date: 2026-08-31
category: update
status: in-progress
---

# GitHub Content System

## Description

Karkhana is a GitHub-based content management system that lets team members
create and update structured Markdown files. Approved changes are automatically
shown on the Karkhana website, with GitHub as the source of truth.

## Progress

- Content workflow defined in REQUIREMENTS.md.
- Markdown structure and date format agreed.
- Validation pipeline built (frontmatter, category, status, date, slug, sections).
- Next.js website scaffolding added.

## Next Steps

- Wire the website to read merged Markdown via the GitHub API.
- Set up automatic deployment and on-demand revalidation.
- Add more content types (projects, people, events, resources).
