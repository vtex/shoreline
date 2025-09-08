# scripts <!-- omit in toc -->

This directory contains scripts that are used on automated processes (CI/CD, documentation generation, etc.).

- [`create-json-rep.mjs`](#create-json-repmjs)
  - [Features](#features)
  - [Output](#output)
  - [Usage](#usage)
  - [Configuration](#configuration)
- [`configure-git-user.sh`](#configure-git-usersh)
  - [Testing](#testing)

## [`create-json-rep.mjs`](create-json-rep.mjs)

Generates a comprehensive JSON representation of all components in the Shoreline design system. This script analyzes TypeScript/React component files and extracts metadata including component descriptions, prop types, default values, and JSDoc comments.

The script uses a hybrid approach combining `react-docgen` with custom TypeScript parsing to provide accurate type information even for complex component definitions.

### Features

- **Automatic component discovery**: Scans the components directory and filters out test files, stories, and utility files
- **Rich type extraction**: Properly extracts union types (`'primary' | 'secondary'`), function types, CSS property types, and more
- **TypeScript support**: Uses both `react-docgen` and custom regex-based parsing for comprehensive TypeScript interface analysis
- **Multi-line type support**: Handles complex type definitions that span multiple lines
- **Fallback parsing**: When `react-docgen` fails, falls back to manual extraction for basic component information
- **Verbose mode**: Optional detailed logging for debugging and monitoring the parsing process

### Output

The script generates a JSON file containing component metadata in the following structure:

```json
{
  "ComponentName": {
    "displayName": "ComponentName",
    "description": "Component description from JSDoc",
    "props": {
      "propName": {
        "type": "'value1' | 'value2' | 'value3'",
        "required": true,
        "description": "Prop description",
        "defaultValue": "'value1'"
      }
    },
    "methods": [],
    "composes": [],
    "examples": []
  }
}
```

### Usage

The script is configured to run via npm/pnpm script:

```bash
# Generate component documentation
pnpm gen:components-json

# Run with verbose output for debugging
node scripts/create-json-rep.mjs --verbose
```

### Configuration

The script is pre-configured for the Shoreline project structure:
- **Input path**: `./packages/shoreline/src/components`
- **Output file**: `./shoreline-components.json`
- **File extensions**: `.jsx`, `.tsx`, `.js`, `.ts`

## [`configure-git-user.sh`](configure-git-user.sh)

Randomly picks a Shoreline member and sets it as the git user. This makes it possible to automate deployments of the documentation site to Vercel.

User and email are set as secret variables in the CI/CD pipelines and you can refer to their values by visiting our doc (only available for VTEXers) here: [GIT_USERS and GIT_EMAILS from vtex/shoreline](https://docs.google.com/spreadsheets/d/1DWNqJED40wceC5Qmd56sEKPnir8rjktt6mzOPuhtQBM/edit#gid=0).

### Testing

To test this script locally, run:

```bash
LOCAL_TEST=1 GIT_USERS="abc def ghi jkl" GIT_EMAILS="abc@email.com def@email.com ghi@email.com jkl@email.com" sh configure-git-user.sh
```
