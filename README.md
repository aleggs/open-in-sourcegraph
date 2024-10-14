# Open in Sourcegraph

## Overview

**Open in Sourcegraph** is a Visual Studio Code extension that allows you to quickly open files from your project directly in Sourcegraph. With a simple right-click, you can navigate to the corresponding file in your organization's Sourcegraph instance.

## Features

- **Quick Access:** Open any file in Sourcegraph directly from VS Code.
- **Customizable Settings:** Configure the Sourcegraph subdomain, base path, and repository name key path to match your project's structure.
- **Seamless Integration:** Integrates with the VS Code explorer context menu for easy access.

## Installation

1. **Install the Extension:**

   - Open the Extensions view in VS Code (`Ctrl+Shift+X` or `Cmd+Shift+X`).
   - Search for "**Open in Sourcegraph**".
   - Click **Install** to add the extension to your VS Code.

## Usage

1. **Ensure `package.json` Exists:**

   - **Note:** Your project must have a `package.json` file located at the root directory. The extension relies on this file to extract the repository name needed to construct the Sourcegraph URL.

2. **Configure the Extension Settings:**

   - Open VS Code settings (`Ctrl+,` or `Cmd+,`).
   - Search for **Open in Sourcegraph** to find the extension's settings.
   - Set the following configuration options:

     - **Sourcegraph Subdomain (`openInSourcegraph.sourcegraphSubdomain`):**

       - The subdomain of your Sourcegraph instance (e.g., "company").

     - **Base Path (`openInSourcegraph.basePath`):**

       - The base path used in the Sourcegraph URL (e.g., "code.company.com/path").

     - **Package JSON Repo Key Path (`openInSourcegraph.packageJsonRepoKeyPath`):**

       - The key path in `package.json` to extract the repository name, using dot notation (e.g., "repository.name").

3. **Using the Extension:**

   - In the VS Code explorer, right-click on a file.
   - Select **Open in Sourcegraph** from the context menu.
   - The corresponding file will open in your default web browser via Sourcegraph.

## Configuration Options

The extension can be customized through the following settings:

### `openInSourcegraph.sourcegraphSubdomain`

- **Type:** `string`
- **Default:** "your-subdomain"
- **Description:** The subdomain of your Sourcegraph instance. For example, if your Sourcegraph URL is `https://company.sourcegraph.com`, set this to "company".

### `openInSourcegraph.basePath`

- **Type:** `string`
- **Default:** "your-base-path"
- **Description:** The base path in the Sourcegraph URL after the domain. This may include paths specific to your organization's Sourcegraph setup.

### `openInSourcegraph.packageJsonRepoKeyPath`

- **Type:** `string`
- **Default:** "your.key.path"
- **Description:** The key path within your `package.json` file where the repository name is located. Use dot notation for nested keys.

## Example Configuration

Given a `package.json` file with contents like:

```json
{  
  "repository": {  
    "name": "my-cool-repository"  
  }  
}
```

You should configure the extension settings as follows:

- **Sourcegraph Subdomain:**

  "company"

- **Base Path:**

  "code.company.com/path"

- **Package JSON Repo Key Path:**

  "repository.name"

With these settings, the extension constructs the Sourcegraph URL as:

```
https://company.sourcegraph.com/code.company.com/path/my-cool-repository/-/blob/<relativeFilePath>
```

## Troubleshooting

- **Missing `package.json` File:**

  - If you receive an error stating `"package.json not found in the project root."`, ensure that a `package.json` file exists at the root of your workspace. The extension requires this file to retrieve the repository name.

- **Repository Name Not Found:**

  - If you receive an error stating `"Repository name not found in package.json at 'your.key.path'."`, ensure that the `packageJsonRepoKeyPath` correctly points to the repository name in your `package.json`. Verify that the key path matches the structure of your `package.json`.

- **Incorrect URL Structure:**

  - Double-check your `sourcegraphSubdomain` and `basePath` settings to ensure they match your organization's Sourcegraph URL structure.

## License

This extension is licensed under the MIT License.
