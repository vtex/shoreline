# @vtex/gatsby-plugin-admin-ui

Gatsby plugin to create custom components and allow theme customization

```sh
yarn add @vtex/admin-ui @vtex/admin-ui-icons @vtex/gatsby-plugin-admin-ui
```

```js
// gatsby-config.js
module.exports = {
  plugins: ['@vtex/gatsby-plugin-admin-ui'],
}
```

## Options

| Key       | Default value | Description                                    |
| --------- | ------------- | ---------------------------------------------- |
| `appName` | `gatsby`      | Name of your app (required for microfrontends) |

```js
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

```js
// src/@vtex/gatsby-plugin-admin-ui/index.js
export default {
  colors: {
    text: '#000',
    background: '#fff',
  },
}
```

⚠️ Export as `default` is required.

## Custom components

You can create a new component theme by shadowing `src/@vtex/gatsby-plugin-admin-ui/components.js`.

```js
// src/@vtex/gatsby-plugin-admin-ui/components.js
export default {
  componentName: {
    bg: 'blue',
    color: 'light.primary',
    // ...
  },
}
```
