import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { TokensGrid } from './components/tokens-grid'
import { IconsGrid } from './components/icons-grid'
import { Pre } from './components/pre'
import { Logo } from './components/logo'

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: 'https://github.com/vtex/shoreline',
  },
  docsRepositoryBase: 'https://github.com/vtex/shoreline/packages/next-docs',
  footer: {
    text: 'VTEX Design System for backoffice experiences',
  },
  darkMode: false,
  components: {
    TokensGrid,
    IconsGrid,
    pre: Pre,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
}

export default config
