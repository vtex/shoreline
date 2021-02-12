---
path: /theming/components/
---

# Components

To define a component with a shared themeKey, as `admin-ui` component does - You must create a single object that contains your components.

**Component theme shape:**
Check: [Consuming theme keys](/style-object/#consuming-theme-keys)

```js isStatic
[componentName]: {
  // StyleObject
}
```

**Follow the example below:**

```jsx isStatic
// define an object containing your components
const components = {
  avatar: {
    // styles of your component
    bg: 'blue',
    borderRadius: 'round',
  },
  // other components
}

// create a new system passing your custom components
const system = createSystem('app-name', {
  components,
})

// on the theme-provider
<ThemeProvider system={system}>
  {/** app */}
</ThemeProvider>

// USAGE:

// 1. within a style-object. Works on styles & styleOverides as well
const { cn } = useSystem()
<div className={cn({ themeKey: 'components.avatar'})} />

// 2. Directly on a primitive component, like Box, Flex, etc.
<Box themeKey="components.avatar" />
```

### Using variants

Variants are options that the components can have. Imagine that the `component` above, could vary in `size` and `palette`:

**Component with variants theme shape:**

```js isStatic
[componentName]: {
  styles: {
    // StyleObject
    // It will be present on all variants
  }
  [variantName]: {
    [variantOption]: {
      // StyleObject
    }
  }
}
```

**ThemeKey with variants shape:**

```js isStatic
{
  themeKey: {[componentName]: { [variantName]: [variantOption] }}
}
```

**Example:**

```jsx isStatic
// theme with variants
const components = {
  avatar: {
    styles: {
      /** styles that will be on every variant */
      borderRadius: round,
    },
    /** `palette` here, is the name of the variant */
    palette: {
      primary: {
        /** sytles of the primary palette */
        bg: 'blue',
      },
      danger: {
        /** styles of the danger one... */
        bg: 'red',
      },
      /** and so on... */
    },
    size: {
      small: {
        width: 10,
      },
      regular: {
        width: 20,
      },
    },
  },
}

// 1. within a style-object. Works on styles & styleOverides as well
const { cn } = useSystem()
<div className={cn({ themeKey: { avatar: { palette: 'primary', size: 'small' }})} />

// 2. Directly on a primitive component, like Box, Flex, etc.
<Box themeKey={{avatar: {palette: 'primary', size: 'small' }}} />
```
