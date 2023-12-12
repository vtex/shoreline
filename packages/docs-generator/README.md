# @vtex/docs-generator

## Description

This is a package that generates documentation from Typescript code. It uses TypeDoc under the hood to generate the documentation from code, and then it passes its output down the pipeline to our own parser, which generates markdown files from TypeDoc's JSON output using Handlebars.

## Usage

Clone the repository, and run `pnpm install` from the root of the repository.

Run `pnpm run generate-docs` from the root of the repository:

```sh
pnpm run generate-docs
```

## Architecture

The `docs-generator` package is composed of two main parts:

- The TypeDoc parser, which is responsible for generating the documentation from Typescript code.
- The JSON parser, which is responsible for generating markdown files from TypeDoc's JSON output.

### TypeDoc parser

The TypeDoc parser is a wrapper around TypeDoc's Node API. It is responsible for generating the documentation from Typescript code.

### JSON parser

The JSON parser is responsible for generating markdown files from TypeDoc's JSON output. [It is a patch on top of the `typedoc-json-parser` library](../../patches/typedoc-json-parser@9.0.1.patch). This patch is necessary because the `typedoc-json-parser` library types are currently broken.

### Code organization

The `docs-generator` package is organized as follows:

```bash
docs-generator
├── src
│   ├── json-parser # The typedoc-json-parser library patch
│   ├── templates # The Handlebars templates used to generate .mdx files
│   ├── config.ts # The configuration file for TypeDoc
│   ├── templates.ts # Handlebars utilities
│   ├── handlers.ts # A set of functions that handle our different use cases (such as genreating a component documentation)
│   ├── io.ts # A set of functions that handle IO operations
│   ├── parser.ts # The JSON parser entrypoint
│   └── index.ts # The entrypoint of this package where TypeDoc is configured, executed and its output is passed down the pipeline to our JSON parser
```

## Best practices when writing documentation on code

### For React components

- Always provide a description for the component.
- Always use the `@example` tag to provide examples of how to use the component. From this tag, a playground is generated.
- Always provide a description of each property of the component, including the `@default` value when necessary.

Example:

```jsx
/**
 * Buttons triggers allow users to identify and start the most important actions in a container.
 *
 * @example
 * <Button>Action label</Button>
 */
export function Button(props: ButtonProps) {
    const {
        children,
        size = 'normal',
        variant = 'secondary',
        ...rest
    } = props

    return <button data-size={size} data-variant={variant} {...rest}>{children}</button>
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The size of the button.
     *
     * @default 'normal'
     */
    size?: 'small' | 'normal' | 'large'
    /**
     * The variant of the button.
     *
     * @default 'secondary'
     */
    variant?: 'primary' | 'secondary' | 'tertiary'
}
```
