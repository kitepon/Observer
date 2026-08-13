import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const macosHostTests = new Set([
  "advisory-semantic-decision.test.mjs",
  "aiterm-process-transport.test.mjs",
  "claude-characterization.test.mjs",
  "claude-host-adapter.test.mjs",
  "claude-host-runtime.test.mjs",
  "claude-model-operation.test.mjs",
  "cli.test.mjs",
  "codex-host-adapter.test.mjs",
  "codex-host-runtime.test.mjs",
  "codex-process-transport.test.mjs",
  "mailbox-store.test.mjs",
  "model-operation-store.test.mjs",
  "parent-stop-hook-config.test.mjs",
  "private-state.test.mjs",
  "read-only-execution-profile.test.mjs",
]);

const files = readdirSync(join(root, "test"))
  .filter((name) => name.endsWith(".test.mjs"))
  .filter((name) => process.platform !== "win32" || !macosHostTests.has(name))
  .sort()
  .map((name) => join("test", name));

const result = spawnSync(process.execPath, ["--test", ...files], {
  cwd: root,
  stdio: "inherit",
});
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
