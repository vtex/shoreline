import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { TokensGrid } from './components/tokens-grid'
import { IconsGrid } from './components/icons-grid'

import { Logo } from './components/logo'
import {
  RelatedComponent,
  RelatedComponentList,
} from './components/related-component'

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: 'https://github.com/vtex/shoreline',
  },
  docsRepositoryBase: 'https://github.com/vtex/shoreline/packages/docs',
  footer: {
    text: 'VTEX Design System for back-office experiences.',
  },
  darkMode: false,
  nextThemes: {
    forcedTheme: 'light',
  },
  components: {
    TokensGrid,
    IconsGrid,
    RelatedComponentList: RelatedComponentList as React.FC,
    RelatedComponent: RelatedComponent as React.FC,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
}

export default config
