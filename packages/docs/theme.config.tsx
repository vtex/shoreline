import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { TokensGrid } from './components/tokens-grid'
import { IconsGrid } from './components/icons-grid'

import { Logo } from './components/logo'
import {
  RelatedComponent,
  RelatedComponentList,
} from './components/related-component'
import { Preview } from './components/preview'
import { PropsDocs } from './components/props-docs'
import { ComponentDescription } from './components/component-description'
import {
  ComponentSummary,
  ComponentSummaryGrid,
} from './components/component-summary'
import { ImgCard, ImgCardGrid } from './components/img-card'

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
    Preview: Preview as React.FC,
    PropsDocs: PropsDocs as React.FC,
    ComponentDescription: ComponentDescription as React.FC,
    ComponentSummary: ComponentSummary as React.FC,
    ComponentSummaryGrid: ComponentSummaryGrid as React.FC,
    ImgCard: ImgCard as React.FC,
    ImgCardGrid: ImgCardGrid as React.FC,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
}

export default config
