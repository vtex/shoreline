// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Admin UI',
  tagline: '',
  url: 'https://admin-ui.vercel.app/',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'VTEX',
  projectName: 'admin-ui',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarCollapsed: false,
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          editUrl:
            'https://github.com/vtex/admin-ui/edit/main/packages/admin-ui-docs/',
          breadcrumbs: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
        gtag: {
          trackingID: 'G-K6LT0G8PH7',
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  plugins: ['docusaurus-plugin-sass'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
      i18n: {
        defaultLocale: 'en',
        locales: ['en'],
      },
      navbar: {
        title: 'Admin UI',
        logo: {
          alt: 'VTEX Logo',
          src: 'img/vtex-logo.svg',
        },
      },
      footer: {
        style: 'light',
        logo: {
          src: 'img/vtex-logo.svg',
        },
      },
      algolia: {
        appId: 'ZJU0P6KHND',
        apiKey: '67b1b8272c21027224efed33015e3bc3',
        indexName: 'admin-ui',
        debug: false,
      },
      liveCodeBlock: {
        /**
         * The position of the live playground, above or under the editor
         * Possible values: "top" | "bottom"
         */
        playgroundPosition: 'top',
      },
      prism: {
        theme: lightCodeTheme,
      },
    }),
}

module.exports = config
