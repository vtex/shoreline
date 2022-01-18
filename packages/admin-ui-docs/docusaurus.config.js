// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Admin UI',
  tagline: 'Dinosaurs are cool',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'VTEX',
  projectName: 'onda',

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
            'https://github.com/vtex/onda/edit/main/packages/admin-ui-docs/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  plugins: ['docusaurus-plugin-sass'],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      hideableSidebar: true,
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
        items: [
          {
            label: 'Current',
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                to: '/help/release-notes',
                label: 'All versions',
              },
            ],
            dropdownActiveClassDisabled: true,
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/vtex/onda',
            className: 'header-github-link',
            position: 'right',
            'aria-label': 'GitHub repository',
          },
        ],
        hideOnScroll: true,
      },
      algolia: {
        appId: 'R2IYF7ETH7',
        apiKey: '599cec31baffa4868cae4e79f180729b',
        indexName: 'docsearch',
        contextualSearch: true,
      },
      liveCodeBlock: {
        playgroundPosition: 'top',
      },
      prism: {
        theme: lightCodeTheme,
      },
    }),
}

module.exports = config
