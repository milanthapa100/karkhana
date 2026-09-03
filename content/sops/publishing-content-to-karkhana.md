---
title: Publishing Content to Karkhana
author: Milan
summary: Standard procedure for creating and publishing content updates on the Karkhana website.
owner: Milan
date: 2026-09-03
category: sop
status: active
---

# Publishing Content to Karkhana

## Description

This Standard Operating Procedure describes the steps required to publish a
content update to the Karkhana website. Content changes always go through a
branch and Pull Request, are validated automatically, and are reviewed before
merging.

## Steps

- [ ] Create a feature branch following the `person/action-description` naming convention
- [ ] Add or edit the Markdown file under the correct `content/<category>/` folder
- [ ] Verify the frontmatter has all required fields (title, author, date, category, status)
- [ ] Confirm the filename slug matches the title
- [ ] Run `npm run validate` locally and fix any errors
- [ ] Commit with a clear message and push the branch
- [ ] Open a Pull Request to `main` and fill in the template
- [ ] Wait for the Validate Content check to pass
- [ ] Request review and address feedback
- [ ] Merge the Pull Request and confirm the update appears on the live site

## Related

- See the [Contributing guide](../../CONTRIBUTING.md) for the full workflow.
