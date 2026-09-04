#!/usr/bin/env node
/**
 * Karkhana content validator.
 *
 * Checks every Markdown file under content/ against schema.json:
 *   - valid YAML frontmatter with required fields
 *   - allowed categories and directory placement
 *   - allowed status values
 *   - real YYYY-MM-DD calendar date
 *   - filename slug matches the title
 *   - required body sections present
 *
 * Dependency-free (pure Node) so it runs in CI with no `npm install`.
 *
 * Usage:
 *   node scripts/validate.mjs                # validate all content
 *   node scripts/validate.mjs "path,path"    # validate only named files
 *
 * Exit code: 0 on success, 1 when any file fails validation.
 */

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve, relative, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(
  typeof import.meta.dirname === "string"
    ? import.meta.dirname
    : dirname(fileURLToPath(import.meta.url)),
  "..",
);
const CONTENT_DIR = join(ROOT, "content");
const SCHEMA = JSON.parse(readFileSync(join(ROOT, "schema.json"), "utf8"));

const FILE_PATTERN = new RegExp(SCHEMA.filenamePattern);
const REQUIRED_FIELDS = ["title", "author", "date", "category", "status"];

// --- YAML frontmatter parser (minimal, for our known shape) --------------

function parseFrontmatter(raw) {
  const text = raw.replace(/^\uFEFF/, "");
  if (!text.startsWith("---")) return { error: "missing frontmatter (must start with ---)" };
  const end = text.indexOf("\n---", 3);
  if (end === -1) return { error: "frontmatter is not closed (missing a second ---)" };
  const block = text.slice(3, end);
  const body = text.slice(end + 4);
  const data = {};
  for (const line of block.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const idx = t.indexOf(":");
    if (idx === -1) continue;
    const key = t.slice(0, idx).trim();
    let value = t.slice(idx + 1).trim();
    if (typeof value === "string") {
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
    }
    data[key] = value;
  }
  return { data, body };
}

function isRealDate(str) {
  if (typeof str !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return false;
  const [y, m, d] = str.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  );
}

function slugify(title) {
  return String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// --- File discovery -------------------------------------------------------

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".md")) out.push(full);
  }
  return out;
}

// --- Validation -----------------------------------------------------------

function validateFile(file) {
  const errors = [];
  const rel = relative(ROOT, file).replace(/\\/g, "/");
  const raw = readFileSync(file, "utf8");

  if (!FILE_PATTERN.test(basename(file))) {
    errors.push(
      `filename "${basename(file)}" must match ${SCHEMA.filenamePattern} (lowercase, hyphenated)`,
    );
  }

  const { data, body, error } = parseFrontmatter(raw);
  if (error) {
    errors.push(error);
    return { rel, errors };
  }

  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === "") {
      errors.push(`missing required frontmatter field: "${field}"`);
    }
  }

  const category = data.category;
  const catConf = SCHEMA.categories[category];
  if (!catConf) {
    const allowed = Object.keys(SCHEMA.categories).join(", ");
    errors.push(
      `"category" must be one of: ${allowed} (got "${category ?? "undefined"}")`,
    );
  } else {
    const expectedDir = catConf.directory; // e.g. "content/updates"
    if (dirname(rel) !== expectedDir) {
      errors.push(
        `file must live under ${expectedDir}/ (found in "${dirname(rel)}")`,
      );
    }
    if (data.status && !catConf.allowedStatuses.includes(data.status)) {
      errors.push(
        `"status" must be one of: ${catConf.allowedStatuses.join(", ")} (got "${data.status}")`,
      );
    }
    if (catConf.requiredFields) {
      for (const field of catConf.requiredFields) {
        if (data[field] === undefined || data[field] === "") {
          errors.push(`missing required frontmatter field: "${field}"`);
        }
      }
    }
  }

  if (data.date !== undefined && data.date !== "" && !isRealDate(data.date)) {
    errors.push(`"date" must be a real calendar date in YYYY-MM-DD (got "${data.date}")`);
  }

  if (data.title !== undefined && data.title !== "") {
    const expected = slugify(data.title);
    const actual = basename(file).replace(/\.md$/, "");
    if (expected && actual !== expected) {
      errors.push(
        `filename "${basename(file)}" does not match the title; expected slug "${expected}.md"`,
      );
    }
  }

  if (category && catConf && body !== undefined) {
    for (const section of catConf.requiredSections) {
      const headingRe = new RegExp(`^##\\s+${section}\\s*$`, "m");
      if (!headingRe.test(body)) {
        errors.push(`missing required section: "## ${section}"`);
      }
    }
    if (category === "sop") {
      if (!/^-\s*\[[ xX]\]\s+.+$/m.test(body)) {
        errors.push(
          '"## Steps" must contain at least one checklist item starting with "- [ ]"',
        );
      }
    }
  }

  return { rel, errors };
}

// --- Main -----------------------------------------------------------------

function main() {
  const maybeFiles = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  let paths = [];
  if (maybeFiles.length) {
    for (const p of maybeFiles) {
      for (const seg of p.split(",")) {
        if (seg.trim()) paths.push(join(ROOT, seg.trim()));
      }
    }
  } else {
    if (!existsSync(CONTENT_DIR)) {
      console.log("No content/ directory found; nothing to validate.");
      process.exit(0);
    }
    paths = walk(CONTENT_DIR);
  }

  if (paths.length === 0) {
    console.log("No .md files to validate.");
    process.exit(0);
  }

  let failures = 0;
  for (const file of paths) {
    const { rel, errors } = validateFile(file);
    if (errors.length) {
      failures++;
      console.log(`\n\u2716 ${rel}`);
      for (const e of errors) console.log(`   - ${e}`);
    } else {
      console.log(`\u2714 ${rel}`);
    }
  }

  const total = paths.length;
  const passed = total - failures;
  console.log(`\n${passed}/${total} file(s) valid.`);
  if (failures) {
    console.log(`\u2716 ${failures} file(s) failed validation.`);
    process.exit(1);
  }
}

main();
