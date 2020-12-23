import React from 'react'
import { Box, cn, Text, Tooltip } from '@vtex/admin-ui'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { unstable_useId as useId } from 'reakit'
import kebabCase from 'lodash/kebabCase'

import Experimental from '../icons/Experimental'
import { Searchbar, useSearch } from './Searchbar'

const query = graphql`
  query DocsQuery {
    allNavigationYaml {
      nodes {
        section
        paths
      }
    }
    allMarkdownRemark {
      nodes {
        title
        frontmatter {
          path
          experimental
          fullPage
        }
      }
    }
  }
`

const linkStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  width: 'full',
  borderRadius: 'flat',
  alignItems: 'center',
  paddingY: 2,
  paddingX: 2,
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
  marginY: '2px',
  ':hover:not(:focus)': {
    color: 'brand',
  },
  '&[aria-current="page"]': {
    borderLeftWidth: 2,
    borderLeftColor: 'brand',
    borderLeftStyle: 'solid',
    color: 'brand',
  },
  ':focus': {
    color: 'brand',
    outline: 'none',
  },
  svg: {
    height: 20,
    width: 20,
  },
}

export default function DocsNavigation() {
  const data: Data = useStaticQuery(query)
  const { id: baseId } = useId({ baseId: 'docs-navigation' })

  const getId = (section: string) => `${baseId}-${kebabCase(section)}`
  const findMeta = (path: string) =>
    data.allMarkdownRemark.nodes.find((node) => node.frontmatter.path === path)

  const getTitle = (path: string) => findMeta(path)?.title ?? ''
  const isExperimental = (path: string) =>
    Boolean(findMeta(path)?.frontmatter.experimental)

  const { searchState, current } = useSearch()

  return (
    <Box
      styles={{
        'nav:first-of-type': {
          margin: 0,
        },
      }}
    >
      <header
        className={cn({
          position: 'sticky',
          top: 0,
          right: 0,
          left: 0,
          padding: 2,
          bg: 'muted.2',
          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <Searchbar
          placeholder="Search for component"
          id="navgation-search"
          state={searchState}
        />
      </header>
      {data.allNavigationYaml.nodes.map((node) => (
        <nav
          className={cn({
            paddingX: 4,
            paddingY: 2,
          })}
          key={node.section}
          aria-labelledby={getId(node.section)}
        >
          <Text
            styleOverrides={{
              paddingY: 0,
              paddingX: 0,
              color: 'text.secondary',
            }}
            variant="highlight"
            id={getId(node.section)}
          >
            {node.section}
          </Text>
          <ul className={cn({ padding: 0 })}>
            {node.paths
              .filter((path) =>
                current !== ''
                  ? getTitle(path)
                      .toLocaleLowerCase()
                      .includes(current.toLowerCase())
                  : path
              )
              .map((path) => (
                <li
                  className={cn({
                    listStyle: 'none',
                    display: 'flex',
                    width: 'full',
                    justifyContent: 'space-between',
                  })}
                  key={path}
                >
                  {isExperimental(path) ? (
                    <Tooltip label="Experimental" placement="right">
                      <Link className={cn(linkStyles)} to={path}>
                        {getTitle(path)}
                        <Experimental role="presentation" />
                      </Link>
                    </Tooltip>
                  ) : (
                    <Link className={cn(linkStyles)} to={path}>
                      {getTitle(path)}
                    </Link>
                  )}
                </li>
              ))}
          </ul>
        </nav>
      ))}
    </Box>
  )
}

interface Data {
  allNavigationYaml: {
    nodes: Array<{
      section: string
      paths: string[]
    }>
  }
  allMarkdownRemark: {
    nodes: Array<{
      title: string
      frontmatter: {
        path: string
        experimental?: boolean
      }
    }>
  }
}
