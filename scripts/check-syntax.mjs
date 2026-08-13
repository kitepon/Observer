import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
for (const directory of ["bin", "src", "scripts", "test"]) {
  for (const name of readdirSync(join(root, directory)).filter((entry) => entry.endsWith(".mjs")).sort()) {
    const result = spawnSync(process.execPath, ["--check", join(directory, name)], {
      cwd: root,
      stdio: "inherit",
    });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status ?? 1);
  }
}
