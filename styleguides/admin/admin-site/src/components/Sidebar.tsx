import React, { ReactNode } from 'react'
import { Text, Flex, tag } from '@vtex/admin-ui'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { unstable_useId as useId } from 'reakit'
import kebabCase from 'lodash/kebabCase'

import { useSearchContext } from './Search'
import Logo from '../icons/Logo'

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

export function useSearchableData(): Array<{
  path: string
  name: string
  section: string
}> {
  const rawData: Data = useStaticQuery(query)
  const findMeta = (path: string) =>
    rawData.allMarkdownRemark.nodes.find(
      (node) => node.frontmatter.path === path
    )
  const getTitle = (path: string) => findMeta(path)?.title ?? ''

  const data = rawData.allNavigationYaml.nodes.reduce((acc: any, node) => {
    const paths = node.paths
    const forms = paths.reduce((pathAcc: any, path: string) => {
      return [
        ...pathAcc,
        {
          name: getTitle(path),
          section: node.section,
          path,
        },
      ]
    }, [])
    return [...acc, ...forms]
  }, [])

  return data
}

export function Sidebar() {
  const data: Data = useStaticQuery(query)
  const { id: baseId } = useId({ baseId: 'docs-navigation' })
  const getId = (section: string) => `${baseId}-${kebabCase(section)}`
  const findMeta = (path: string) =>
    data.allMarkdownRemark.nodes.find((node) => node.frontmatter.path === path)
  const getTitle = (path: string) => findMeta(path)?.title ?? ''
  const { current } = useSearchContext()

  return (
    <tag.div
      csx={{
        height: '100vh',
        overflowY: 'auto',
        'nav:first-of-type': {
          margin: 0,
        },
        borderRight: '1px solid',
        borderColor: 'mid.tertiary',
      }}
    >
      <tag.div
        csx={{
          height: 64,
          top: 0,
          position: 'sticky',
          bg: 'light.primary',
          color: 'rebelPink',
        }}
      >
        <Logo />
      </tag.div>
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
              <tag.a
                as={Link}
                csx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderRadius: 'default',
                  alignItems: 'center',
                  height: 32,
                  paddingX: 2,
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  marginBottom: 2,
                  ':hover:not(:focus)': {
                    color: 'blue',
                  },
                  '&[aria-current="page"]': {
                    bg: '#EAF0FD',
                    color: 'blue',
                  },
                  ':focus': {
                    color: 'blue',
                    outline: 'none',
                  },
                }}
                to={path}
              >
                {getTitle(path)}
              </tag.a>
            </Flex>
          ))

        if (paths.length > 0) {
          return [
            ...acc,
            <tag.nav
              csx={{
                paddingX: 4,
                paddingY: 1,
              }}
              key={node.section}
              aria-labelledby={getId(node.section)}
            >
              <Text
                csx={{
                  paddingY: 0,
                  paddingX: 0,
                  color: 'dark.secondary',
                }}
                id={getId(node.section)}
              >
                {node.section}
              </Text>
              <tag.ul csx={{ padding: 0 }}>{paths}</tag.ul>
            </tag.nav>,
          ]
        }

        return acc
      }, [])}
    </tag.div>
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
