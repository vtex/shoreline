import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { Playground } from './components/playground'

const config: DocsThemeConfig = {
  logo: <span>🏝️ Beachfront</span>,
  project: {
    link: 'https://github.com/vtex/beachfront',
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase: 'https://github.com/vtex/beachfront/next-docs',
  footer: {
    text: 'Nextra Docs Template',
  },
  components: {
    Playground,
  },
}

export default config
