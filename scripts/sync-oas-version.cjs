#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const rootDir = path.resolve(__dirname, "..");
const packageJsonPath = path.join(rootDir, "package.json");
const openapiPath = path.join(rootDir, "src", "openapi.yaml");

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const targetVersion = process.argv[2] || packageJson.version;

if (!targetVersion) {
  throw new Error("Target version is empty.");
}

const openapiContent = fs.readFileSync(openapiPath, "utf8");
const versionPattern = /^(\s{2}version:\s*)['\"][^'\"]+['\"]/m;

if (!versionPattern.test(openapiContent)) {
  throw new Error("Could not find info.version in src/openapi.yaml.");
}

const nextContent = openapiContent.replace(
  versionPattern,
  `$1'${targetVersion}'`,
);

if (nextContent !== openapiContent) {
  fs.writeFileSync(openapiPath, nextContent, "utf8");
}
