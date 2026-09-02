# Karkhana Content System

## 1. Purpose

The Karkhana Content System is a GitHub-based content management
system that allows team members to create and update structured
Markdown (`.md`) files.

The content will be reviewed through GitHub Pull Requests and,
after approval and merging, will be automatically displayed on
the Karkhana webpage.

GitHub will act as the source of truth for the content.

---

## 2. Main Goal

The system should make it possible for:

1. Individual contributors to update content independently.
2. Contributors to work using their own Git branches.
3. Changes to be submitted through Pull Requests.
4. A designated reviewer/maintainer to review changes.
5. Approved changes to be merged into the main branch.
6. The website to automatically read the Markdown content.
7. The website to display the content and its date.
8. Changes to remain traceable through Git history.

---

## 3. Core Workflow

Task
↓
Contributor
↓
Create Branch
↓
Edit Markdown
↓
Commit
↓
Push
↓
Pull Request
↓
Automated Validation
↓
Review
↓
Approval
↓
Merge
↓
Website Build/Update
↓
Published Content

---

## 4. Users

### Contributor

A team member who creates or updates content.

Responsibilities:

- Understand the assigned task.
- Create an appropriate branch.
- Follow the Markdown format.
- Make the required changes.
- Test the changes.
- Create a Pull Request.
- Respond to review comments.

### Reviewer

A person responsible for checking submitted content.

Responsibilities:

- Check content accuracy.
- Check Markdown structure.
- Check required fields.
- Check date.
- Check formatting.
- Request changes when necessary.
- Approve valid Pull Requests.

### Maintainer

A person responsible for maintaining the repository and
merging approved Pull Requests.

Responsibilities:

- Manage repository rules.
- Maintain the content structure.
- Review/merge Pull Requests.
- Manage permissions.
- Maintain automation.
- Ensure the system remains healthy.

---

## 5. Content

The initial system will use Markdown files.

Possible content types:

- Updates
- Projects
- People
- Resources
- Events

The initial prototype will focus on:

`updates/`

---

## 6. Markdown Requirements

Every content file must follow a standardized structure.

Example:

---

title: GitHub Content System
author: Milan
date: 2026-08-31
category: update
status: in-progress

---

# GitHub Content System

## Description

Information about the work or update.

## Progress

Details about the progress.

## Next Steps

Details about the next steps.

---

## 7. Date Requirement

Every content entry must contain a date.

The internal date format will be:

YYYY-MM-DD

Example:

2026-08-31

The website may display this in a human-readable format:

31 August 2026

---

## 8. Git Requirements

Contributors should not directly modify the main branch.

Each contributor should:

1. Pull the latest main branch.
2. Create a working branch.
3. Make changes.
4. Commit changes.
5. Push the branch.
6. Create a Pull Request.

---

## 9. Branch Naming

Branches should follow a consistent naming convention.

Format:

<person>/<action>-<description>

Examples:

milan/update-project
milan/add-resource
milan/update-profile

---

## 10. Pull Request Requirements

Every Pull Request should contain:

- Clear title
- Description of changes
- Related task/ticket
- Testing information
- Contributor checklist

The Pull Request must be reviewed before merging.

---

## 11. Main Branch Protection

The main branch should be protected.

Direct pushes should not normally be allowed.

Changes should enter the main branch through Pull Requests.

---

## 12. Validation

The system should eventually automatically validate:

- Required Markdown fields
- Date format
- Allowed categories
- Allowed status values
- File location
- Markdown syntax
- Invalid or missing metadata

---

## 13. Website

The website should read approved Markdown content from the
repository.

The website should display information such as:

- Title
- Author
- Date
- Category
- Status
- Content

The website should automatically reflect approved changes
after they are merged.

---

## 14. Local Development

A dedicated Karkhana PC may be used as a local development
and testing environment.

The PC may be used for:

- Git development
- Website development
- Markdown testing
- Content validation
- Local server
- Testing automation
- Future internal infrastructure

The PC should not initially be considered the source of truth.

GitHub remains the source of truth.

---

## 15. Future Automation

The system should eventually support:

Pull Request
↓
Automated Validation
↓
Review
↓
Merge
↓
Automatic Build
↓
Automatic Deployment
↓
Website Updated

---

## 16. Non-Functional Requirements

The system should be:

### Simple
A new contributor should be able to understand the workflow.

### Reliable
Invalid content should be detected before publication.

### Traceable
Changes should be tracked through Git history.

### Secure
Only authorized people should be able to merge changes.

### Maintainable
The system should be understandable by future team members.

### Scalable
The structure should support additional content types later.

---

## 17. Initial Prototype

The first prototype will contain:

karkhana-content/

├── content/
│   └── updates/
│       └── example.md
│
├── README.md
├── REQUIREMENTS.md
└── CONTRIBUTING.md

The prototype must demonstrate:

Markdown
↓
GitHub
↓
Branch
↓
Pull Request
↓
Review
↓
Merge
↓
Local webpage
↓
Content + Date

---

## 18. Success Criteria

The prototype will be considered successful when:

- A contributor can create a Markdown file.
- The contributor can submit it through a Pull Request.
- The Pull Request can be reviewed.
- The approved change can be merged.
- The website can read the merged Markdown file.
- The website displays the content correctly.
- The website displays the correct date.
- The complete process is documented.