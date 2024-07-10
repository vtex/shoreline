import type React from 'react'
import { useConfig, type DocsThemeConfig } from 'nextra-theme-docs'
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
import { ContributorList } from './components/contributor-stats'

const docsTitle = 'Shoreline'
const tagline = 'VTEX Design System for back-office experiences.'

const config: DocsThemeConfig = {
  logo: <Logo />,
  useNextSeoProps() {
    return {
      titleTemplate: `%s - ${docsTitle}`,
    }
  },
  head() {
    const { frontMatter } = useConfig()
    const title = frontMatter?.title || docsTitle
    const description = frontMatter?.description || tagline
    const image = '/shoreline-logo.png'

    const composedTitle = `${title} - ${docsTitle}`

    return (
      <>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={'/favicon/apple-touch-icon.png'}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={'/favicon/favicon-32x32.png'}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={'/favicon/favicon-16x16.png'}
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <link rel="manifest" href={'/favicon/site.webmanifest'} />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="title" content={composedTitle} />
        <meta name="description" content={description} />

        <meta property="og:description" content={description} />
        <meta property="og:title" content={composedTitle} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
        <meta name="apple-mobile-web-app-title" content={docsTitle} />
      </>
    )
  },
  project: {
    link: 'https://github.com/vtex/shoreline',
  },
  docsRepositoryBase: 'https://github.com/vtex/shoreline/packages/docs',
  footer: {
    text: tagline,
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
    ContributorList: ContributorList as React.FC,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
}

export default config
