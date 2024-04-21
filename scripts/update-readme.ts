import * as fs from "fs";
import klawSync from "klaw-sync";
import * as path from "path";

interface Item {
  path: string;
}

function getIgnoredPaths(projectRoot: string): string[] {
  const gitignorePath = path.join(projectRoot, ".gitignore");
  if (fs.existsSync(gitignorePath)) {
    const gitignoreContent = fs.readFileSync(gitignorePath, "utf8");
    return gitignoreContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));
  }
  return [];
}

function getDirectoryTree(dir: string, ignorePaths: string[], prefix: string = ""): string {
  const entries = klawSync(dir, { depthLimit: 0 });
  let tree = "";

  for (const entry of entries) {
    if (ignorePaths.some((ignoredPath) => entry.path.includes(ignoredPath))) {
      continue;
    }

    const relativePath = path.relative(dir, entry.path);
    if (entry.stats.isDirectory()) {
      const nestedTree = getDirectoryTree(entry.path, ignorePaths, prefix + "│   ");
      if (nestedTree) {
        // Only add directory if there's content in nestedTree
        tree += `${prefix}├── ${relativePath}/\n${nestedTree}`;
      }
    } else {
      tree += `${prefix}├── ${relativePath}\n`;
    }
  }

  return tree;
}

function updateReadme(): void {
  const projectRoot = path.join(__dirname, "..");
  const ignorePaths = [".git", ...getIgnoredPaths(projectRoot)];
  const tree = getDirectoryTree(projectRoot, ignorePaths);
  const readmePath = path.join(projectRoot, "README.md");
  const readmeContent = fs.readFileSync(readmePath, "utf8");
  const updatedReadme = readmeContent.replace(
    /<!-- treestart -->([\s\S]*?)<!-- treeend -->/,
    `<!-- treestart -->\n\`\`\`\n${tree}\`\`\`\n<!-- treeend -->`,
  );

  fs.writeFileSync(readmePath, updatedReadme);
  console.log("README.md has been updated with the latest directory tree.");
}

updateReadme();
