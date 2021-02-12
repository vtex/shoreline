---
path: /packages/gatsby-plugin-admin-ui/
---

# gatsby-plugin-admin-ui

Gatsby plugin to create custom components and allow theme customization

```bash isStatic
yarn add @vtex/admin-ui @vtex/admin-ui-icons @vtex/gatsby-plugin-admin-ui
```

```js isStatic
// gatsby-config.js
module.exports = {
  plugins: ['@vtex/gatsby-plugin-admin-ui'],
}
```

## Options

| Key       | Default value | Description                                    |
| --------- | ------------- | ---------------------------------------------- |
| `appName` | `gatsby`      | Name of your app (required for microfrontends) |

```js isStatic
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: '@vtex/gatsby-plugin-admin-ui',
      options: {
        appName: 'your_app_name',
      },
    },
  ],
}
```

## Theme configuration

You can achieve theme override & customization by shadowing `src/@vtex/gatsby-plugin-admin-ui/index.js`.

```js isStatic
// src/@vtex/gatsby-plugin-admin-ui/index.(js|ts)
export default {
  colors: {
    text: '#111',
    background: '#fff',
  },
}
```

⚠️ Export as `default` is required.

## Custom components

You can create a new component theme by shadowing `src/@vtex/gatsby-plugin-admin-ui/components.js`.

```js isStatic
// src/@vtex/gatsby-plugin-admin-ui/components.(js | ts)
export default {
  componentName: {
    bg: 'blue',
    color: 'light.primary',
    // ...
  },
}
```
