#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import ts from "typescript";

const repoRoot = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.join(repoRoot, "apps", "web", "src");

const ignoredFilePattern = /(?:\.test|\.browser|\.stories)\.[cm]?[jt]sx?$|[\\/]test[\\/]|[\\/]whatsNew[\\/]/;
const uiPropertyPattern =
  /(?:^|_)(?:action|aria|body|caption|content|description|detail|empty|error|eyebrow|failure|heading|help|hint|label|message|name|placeholder|prompt|status|subtitle|summary|text|title|toast|tooltip|warning)(?:$|_)/i;

function listSourceFiles(directory) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...listSourceFiles(absolutePath));
    } else if (/\.[cm]?[jt]sx?$/.test(entry.name) && !ignoredFilePattern.test(absolutePath)) {
      result.push(absolutePath);
    }
  }
  return result;
}

function normalize(value) {
  return value.replace(/\s+/g, " ").trim();
}

function looksLocalizable(value) {
  if (!/[A-Za-z]/.test(value) || value.length > 240) return false;
  if (/^(?:https?:|file:|data:|[.#/@]|--|[a-z]+:\/\/)/i.test(value)) return false;
  if (/^[\w-]+(?:\.[\w-]+){1,}$/.test(value)) return false;
  if (/^(?:[a-z-]+\s+){4,}[a-z-]+$/i.test(value) && /(?:flex|grid|text|bg|border|rounded|items|justify)-/.test(value)) {
    return false;
  }
  return true;
}

function propertyName(node) {
  if (ts.isIdentifier(node) || ts.isStringLiteral(node)) return node.text;
  return "";
}

const candidates = new Map();

function add(value, file, line, kind) {
  const normalized = normalize(value);
  if (!looksLocalizable(normalized)) return;
  const existing = candidates.get(normalized) ?? { value: normalized, count: 0, contexts: [] };
  existing.count += 1;
  if (existing.contexts.length < 4) {
    existing.contexts.push(`${path.relative(repoRoot, file)}:${line}:${kind}`);
  }
  candidates.set(normalized, existing);
}

for (const file of listSourceFiles(sourceRoot)) {
  const sourceText = fs.readFileSync(file, "utf8");
  const sourceFile = ts.createSourceFile(
    file,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    file.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
  );

  function visit(node) {
    const line = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1;

    if (ts.isJsxText(node)) {
      add(node.getText(sourceFile), file, line, "jsx-text");
    } else if (
      ts.isJsxAttribute(node) &&
      node.initializer &&
      ts.isStringLiteral(node.initializer) &&
      (/(?:^aria-(?:label|description)$)|^(?:alt|placeholder|title)$/i.test(
        node.name.getText(sourceFile),
      ) || uiPropertyPattern.test(node.name.getText(sourceFile)))
    ) {
      add(node.initializer.text, file, line, `jsx-${node.name.getText(sourceFile)}`);
    } else if (
      (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
      ts.isJsxExpression(node.parent) &&
      ts.isJsxAttribute(node.parent.parent) &&
      uiPropertyPattern.test(node.parent.parent.name.getText(sourceFile))
    ) {
      add(node.text, file, line, `jsx-${node.parent.parent.name.getText(sourceFile)}`);
    } else if (
      (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
      ts.isPropertyAssignment(node.parent) &&
      uiPropertyPattern.test(propertyName(node.parent.name))
    ) {
      add(node.text, file, line, `property-${propertyName(node.parent.name)}`);
    } else if (
      (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) &&
      ts.isVariableDeclaration(node.parent) &&
      ts.isIdentifier(node.parent.name) &&
      uiPropertyPattern.test(node.parent.name.text)
    ) {
      add(node.text, file, line, `variable-${node.parent.name.text}`);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
}

const minimumLength = Number.parseInt(process.argv[2] ?? "1", 10);
const rows = [...candidates.values()]
  .filter((entry) => entry.value.length >= minimumLength)
  .sort((left, right) => left.value.localeCompare(right.value));

for (const entry of rows) {
  console.log(`${JSON.stringify(entry.value)}\t${entry.count}\t${entry.contexts.join(", ")}`);
}

console.error(`Extracted ${rows.length} candidate strings from ${sourceRoot}.`);
