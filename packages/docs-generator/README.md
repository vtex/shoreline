# @vtex/docs-generator

## Description

This is a package that generates documentation from Typescript code. It uses TypeDoc under the hood to generate the documentation from code, and then it passes its output down the pipeline to our own parser, which generates markdown files from TypeDoc's JSON output using Handlebars.

## Usage

Clone the repository, and run `pnpm install` from the root of the repository.

Run `pnpm run generate-docs` from the root of the repository:

```sh
pnpm run generate-docs
```

## Best practices when writing documentation

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
