---
title: GitHub Content System
author: Milan
date: 2026-09-09
category: update
status: in-progress
---

## Description

Karkhana is a GitHub-based content management system that lets team members
create and update structured Markdown files. Approved changes are automatically
shown on the Karkhana website, with GitHub as the source of truth.

## Progress

- Content workflow defined for the content system.
- Markdown structure and date format agreed.
- Validation pipeline built (frontmatter, category, status, date, slug, sections).
- Three content types live: updates, SOPs, and checklists.
- Website reads Markdown directly at build and renders statically; pushing to `main` deploys the new content.
- All content changes go through a branch and Pull Request, with validation and review before merging.
- Search and the command palette index updates, SOPs, and checklists.
- Checklists are interactive: checkable items, progress tracking, and per-visitor state saved in the browser.

## Next Steps

- Add more content types (projects, people, events, resources).
- Record reviewer and approval history on checklists and SOPs.
