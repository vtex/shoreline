import type { ReactNode } from 'react'
import React, { createContext, useMemo } from 'react'
import {
  Flex,
  IconCaret,
  tag,
  darken,
  alpha,
  Button,
  IconTopic,
} from '@vtex/admin-ui'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { unstable_useId as useId } from 'reakit'
import kebabCase from 'lodash/kebabCase'

import { useSearchContext } from './Search'
import Logo from '../icons/Logo'
import useLocation from '../hooks/useLocation'

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

interface BulkVisible {
  visible: boolean
}

const BulkVisibleContext = createContext<BulkVisible>({
  visible: false,
})

function useBulkVisible() {
  const ctx = React.useContext(BulkVisibleContext)

  if (!ctx) {
    throw Error('Error on VisibleContext')
  }

  return ctx
}

export function Sidebar() {
  const data: Data = useStaticQuery(query)
  const { id: baseId } = useId({ baseId: 'docs-navigation' })
  const getId = (section: string) => `${baseId}-${kebabCase(section)}`
  const findMeta = (path: string) =>
    data.allMarkdownRemark.nodes.find((node) => node.frontmatter.path === path)

  const getTitle = (path: string) => findMeta(path)?.title ?? ''
  const search = useSearchContext()
  const [bulkVisible, setBulkVisile] = React.useState(false)
  const { pathname } = useLocation()

  const visible = useMemo(() => {
    return bulkVisible
  }, [bulkVisible])

  return (
    <BulkVisibleContext.Provider
      value={{
        visible,
      }}
    >
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
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 999,
          }}
        >
          <Logo />
          <Button
            variant="adaptative-dark"
            size="small"
            csx={{ marginRight: 1, color: 'dark.primary' }}
            onClick={() => setBulkVisile((v) => !v)}
            icon={<IconTopic />}
          >
            {visible ? 'Collapse' : 'Expand'} All
          </Button>
        </tag.div>
        {data.allNavigationYaml.nodes.reduce<ReactNode[]>((acc, node) => {
          const paths = node.paths
            .filter((path) =>
              search.debouncedValue !== ''
                ? getTitle(path)
                    .toLocaleLowerCase()
                    .includes(search.debouncedValue.toLowerCase())
                : path
            )
            .map((path) => (
              <Flex
                as="li"
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
                    width: '100%',
                    textDecoration: 'none',
                    color: 'dark.secondary',
                    cursor: 'pointer',
                    marginBottom: 1,
                    lineHeight: 1.4,
                    ':hover:not(:focus)': {
                      color: 'blue',
                    },
                    '&[aria-current="page"]': {
                      borderLeft: '2px solid',
                      borderColor: 'blue',
                      bg: alpha('blue.secondary.default', 0.3),
                      color: 'blue',
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
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
              <Section
                key={node.section}
                id={getId(node.section)}
                section={node.section}
                initiallyVisible={node.paths.some((p) => p === pathname)}
              >
                {paths}
              </Section>,
            ]
          }

          return acc
        }, [])}
      </tag.div>
    </BulkVisibleContext.Provider>
  )
}

interface SectionProps {
  id?: string
  initiallyVisible?: boolean
  section: string
  children: ReactNode
}

function Section(props: SectionProps) {
  const { id, section, children, initiallyVisible } = props
  const [visible, setVisible] = React.useState(initiallyVisible)

  const { visible: bulkVisible } = useBulkVisible()

  React.useEffect(
    function syncStates() {
      setVisible(initiallyVisible || bulkVisible)
    },
    [bulkVisible]
  )

  return (
    <tag.nav
      csx={{
        paddingX: 4,
        paddingY: 1,
      }}
      aria-labelledby={id}
    >
      <tag.button
        csx={{
          paddingY: 2,
          paddingX: 1,
          color: 'dark.primary',
          fontSize: 16,
          bg: 'light.primary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          cursor: 'pointer',
          borderRadius: 'default',
          ':hover': {
            bg: darken('light.primary', 0.04),
          },
          ':active': {
            bg: darken('light.primary', 0.08),
          },
        }}
        id={id}
        onClick={() => setVisible((v) => !v)}
      >
        <p>{section}</p>{' '}
        <IconCaret
          csx={{
            zIndex: 1,
          }}
          direction={visible ? 'up' : 'down'}
        />
      </tag.button>
      {visible && (
        <tag.ul csx={{ padding: 0, borderLeft: '1px solid #2121' }}>
          {children}
        </tag.ul>
      )}
    </tag.nav>
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
