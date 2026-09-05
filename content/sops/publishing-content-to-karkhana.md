---
title: Publishing Content to Karkhana
author: Milan
summary: Standard procedure for creating and publishing content updates on the DPK website.
owner: Milan
date: 2026-09-03
category: sop
status: active
---

## Description

This Standard Operating Procedure describes the steps required to publish a content update to the DPK website. Content changes always go through a branch and Pull Request, are validated automatically, and are reviewed before merging.

## When This SOP Is Used

Use this SOP when:

- A new update should be published on the website
- A new SOP should be added to the SOP section
- An existing page needs content changes
- A content file fails validation and needs to be corrected

## Inputs Needed Before Starting

- The content to publish, written in Markdown
- Access to the repository
- Knowledge of the content schema and required frontmatter fields
- A clear branch name following the convention

## Steps

1. Create a feature branch following the `person/action-description` naming convention
2. Add or edit the Markdown file under the correct `content/<category>/` folder
3. Verify the frontmatter has all required fields (title, author, summary, owner, date, category, status)
4. Confirm the filename slug matches the title
5. Run `npm run validate` locally and fix any errors
6. Commit with a clear message and push the branch
7. Open a Pull Request to `main` and fill in the template
8. Wait for the Validate Content check to pass
9. Request review and address feedback
10. Merge the Pull Request and confirm the update appears on the live site

## Quality Gate

The content is ready to publish only when validation passes, the Pull Request is reviewed, and the change is merged to `main`.

## Related

- See the [Creating SOPs and Checklists](/sops/creating-sops-and-checklists) SOP for how SOPs and checklists are created.

## Review History

| Date | Version | Change | Updated By |
|---|---|---|---|
| 2026-09-03 | v0.1 | First draft created | Milan |