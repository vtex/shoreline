# Admin UI Codemod

This repository contains a collection of codemod scripts for use with
[JSCodeshift](https://github.com/facebook/jscodeshift) that help update Admin UI
APIs.

### Usage
`npx admin-ui-codemod <transform> <path> [...options]`
   * `transform` - name of transform, see available transforms below.
   * `path` - files or directory to transform
   * use the `--dry` option for a dry-run and use `--print` to print the output for comparison

This will start an interactive wizard, and then run the specified transform.

### Included Transforms

#### `button-review`

Update `Button` props to the latest specs (0.122.0+).

```sh
npx admin-ui-codemod button-review <path>
```