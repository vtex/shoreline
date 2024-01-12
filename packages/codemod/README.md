# Shoreline Codemod

This repository contains a collection of codemod scripts to use with [JSCodeshift](https://github.com/facebook/jscodeshift) that help update to Shoreline's API.

### Usage

`npx shoreline-codemod <transform> <path> [...options]`

- `transform` - name of transform, see available transforms below.
- `path` - files or directory to transform
- use the `--dry` option for a dry-run and use `--print` to print the output for comparison

This will start an interactive wizard, and then run the specified transform.

### Developing

To add a new codemod script add the new function to a js file in `./src` and add a test with test cases in the `/__tests__` folder. You can use [AST explorer](https://astexplorer.net/) to help during the development process and consult JSCodeshift's [documentation](https://github.com/facebook/jscodeshift/wiki/jscodeshift-Documentation) for help.

To run the tests for your transform run jest in this package's scope:

`pnpm jest`

Since the rest of the monorepo uses vitest for testing, the tests in this package won't be run on CI/CD actions along with the other tests.
