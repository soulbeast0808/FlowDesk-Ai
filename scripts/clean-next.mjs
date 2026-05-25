import { rm } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = dirname(fileURLToPath(import.meta.url));
const frontendDir = resolve(scriptsDir, "..");
const nextDir = resolve(join(frontendDir, ".next"));

if (!nextDir.startsWith(frontendDir)) {
  throw new Error(`Refusing to clean outside frontend: ${nextDir}`);
}

await rm(nextDir, { recursive: true, force: true });
