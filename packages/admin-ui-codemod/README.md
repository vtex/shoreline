# Admin UI Codemod

This repository contains a collection of codemod scripts to use with [JSCodeshift](https://github.com/facebook/jscodeshift) that help update Admin UI
APIs.

### Usage

`npx admin-ui-codemod <transform> <path> [...options]`

- `transform` - name of transform, see available transforms below.
- `path` - files or directory to transform
- use the `--dry` option for a dry-run and use `--print` to print the output for comparison

This will start an interactive wizard, and then run the specified transform.

### Included Transforms

#### `button-review`

Update `Button` props to the 0.122.0+ specs.

```sh
npx admin-ui-codemod button-review <path>
```

#### `set-to-stack`

Migrate from `Set` to `Stack`

```sh
npx admin-ui-codemod set-to-stack <path>
```

#### `radio-review`

Update `Radio` & `RadioGroup` props to the latest specs (0.126.0+)

```sh
npx admin-ui-codemod radio-review <path>
```

#### `toggle-to-switch`

Migrate `Toggle` to `Switch`. Update `Switch` props to the latest specs (0.128.0+)

```sh
npx admin-ui-codemod toggle-to-switch <path>
```

#### `tag-review`

Update `Tag` props to the latest specs (0.131.0+)

```sh
npx admin-ui-codemod tag-review <path>
```
