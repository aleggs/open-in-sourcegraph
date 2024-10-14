import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "openInSourcegraph.open",
    (uri: vscode.Uri) => {
      const filePath = uri.fsPath;
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);

      if (!workspaceFolder) {
        vscode.window.showErrorMessage("Workspace folder not found.");
        return;
      }

      const packageJsonPath = path.join(
        workspaceFolder.uri.fsPath,
        "package.json"
      );

      // Check if package.json exists
      if (!fs.existsSync(packageJsonPath)) {
        vscode.window.showErrorMessage(
          "package.json not found in the project root."
        );
        return;
      }

      // Read and parse package.json
      const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
      const packageJson = JSON.parse(packageJsonContent);

      // Read settings from configuration
      const config = vscode.workspace.getConfiguration("openInSourcegraph");
      const subdomain = config.get<string>(
        "sourcegraphSubdomain",
        "your-subdomain"
      );
      const basePath = config.get<string>("basePath", "your-base-path");
      const repoKeyPath = config.get<string>(
        "packageJsonRepoKeyPath",
        "your.key.path"
      );

      // Extract repository name from package.json using the repoKeyPath
      const repoName = getValueFromPackageJson(packageJson, repoKeyPath);

      if (!repoName) {
        vscode.window.showErrorMessage(
          `Repository name not found in package.json at '${repoKeyPath}'.`
        );
        return;
      }

      // Get the file path relative to the repository root
      const relativeFilePath = path.relative(
        workspaceFolder.uri.fsPath,
        filePath
      );

      // Construct the Sourcegraph URL
      const sourceGraphUrl = `https://${subdomain}.sourcegraph.com/${basePath}/${repoName}/-/blob/${relativeFilePath}`;

      // Debugging: log the constructed URL
      console.log("SourceGraph URL:", sourceGraphUrl);

      // Open the URL in the default browser
      vscode.env.openExternal(vscode.Uri.parse(sourceGraphUrl));
    }
  );
  context.subscriptions.push(disposable);
}

export function deactivate() {}

// Helper function to get value from package.json using key path
function getValueFromPackageJson(obj: any, keyPath: string): any {
  const keys = keyPath.split(".");
  let value = obj;
  for (const key of keys) {
    if (value && typeof value === "object" && key in value) {
      value = value[key];
    } else {
      return null;
    }
  }
  return value;
}
