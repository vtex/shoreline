Getting started

```jsx
import '@vtex/admin-ui-next/theme.scss'

function ThemeProvider({children}) {
  return <I8n><Icon>{children}</Icon></I18n>
}
```

```jsx
function Example() {
  return <ThemeProvider></ThemeProvider>
}
```

```jsx
// root file
import '@vtex/admin-ui-next/theme.css'
```

```scss
@use '@vtex/admin-ui-next/theme.scss';

:root {
  --aui-bg-primary: var(--aui-color-pink40);
}
```
