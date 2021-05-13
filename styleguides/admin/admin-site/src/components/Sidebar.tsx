import React, { ReactNode } from 'react'
import { Box, useSystem, Text, Flex } from '@vtex/admin-ui'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { unstable_useId as useId } from 'reakit'
import kebabCase from 'lodash/kebabCase'

import { useSearchContext } from './Search'

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
          fullPage
        }
      }
    }
  }
`

export function Sidebar() {
  const data: Data = useStaticQuery(query)
  const { cn } = useSystem()
  const { id: baseId } = useId({ baseId: 'docs-navigation' })
  const getId = (section: string) => `${baseId}-${kebabCase(section)}`
  const findMeta = (path: string) =>
    data.allMarkdownRemark.nodes.find((node) => node.frontmatter.path === path)
  const getTitle = (path: string) => findMeta(path)?.title ?? ''
  const { current } = useSearchContext()

  return (
    <Box
      csx={{
        themeKey: 'components.sidebar',
        'nav:first-of-type': {
          margin: 0,
        },
      }}
    >
      {data.allNavigationYaml.nodes.reduce<ReactNode[]>((acc, node) => {
        const paths = node.paths
          .filter((path) =>
            current !== ''
              ? getTitle(path)
                  .toLocaleLowerCase()
                  .includes(current.toLowerCase())
              : path
          )
          .map((path) => (
            <Flex
              element="li"
              key={path}
              justify="space-between"
              csx={{
                listStyle: 'none',
                width: '100%',
              }}
            >
              <Link
                className={cn({
                  themeKey: 'components.sidebarLink',
                })}
                to={path}
              >
                {getTitle(path)}
              </Link>
            </Flex>
          ))

        if (paths.length > 0) {
          return [
            ...acc,
            <nav
              className={cn({
                paddingX: 4,
                paddingY: 1,
              })}
              key={node.section}
              aria-labelledby={getId(node.section)}
            >
              <Text
                csx={{
                  paddingY: 0,
                  paddingX: 0,
                  color: 'dark.secondary',
                }}
                variant="highlight"
                id={getId(node.section)}
              >
                {node.section}
              </Text>
              <Box element="ul" csx={{ padding: 0 }}>
                {paths}
              </Box>
            </nav>,
          ]
        }

        return acc
      }, [])}
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
