import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { Playground } from './components/playground'
import { TokensGrid } from './components/tokens-grid'
import { IconsGrid } from './components/icons-grid'

const containerStyle = {
  fontWeight: 'bold',
  fontSize: '2rem',
  fontFamily: 'Inter',
}

const config: DocsThemeConfig = {
  logo: (
    <span style={containerStyle}>
      <span
        style={{
          fontSize: '2.5rem',
        }}
      >
        ≈
      </span>
      Shoreline
    </span>
  ),
  project: {
    link: 'https://github.com/vtex/shoreline',
  },
  docsRepositoryBase: 'https://github.com/vtex/shoreline/packages/next-docs',
  footer: {
    text: 'VTEX Design System for backoffice experiences',
  },
  components: {
    Playground,
    TokensGrid,
    IconsGrid,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
}

export default config
