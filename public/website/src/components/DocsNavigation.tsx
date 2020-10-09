/** @jsx jsx */
import { jsx, Box, Text } from '@vtex/admin-ui'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { unstable_useId as useId } from 'reakit'
import kebabCase from 'lodash/kebabCase'

const query = graphql`
  query DocsQuery {
    allDocsYaml {
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
        }
      }
    }
  }
`

export default function DocsNavigation() {
  const data: Data = useStaticQuery(query)
  const { id: baseId } = useId({ baseId: 'docs-navigation' })

  const getId = (section: string) => `${baseId}-${kebabCase(section)}`
  const findMeta = (path: string) =>
    data.allMarkdownRemark.nodes.find((node) => node.frontmatter.path === path)

  const getTitle = (path: string) => findMeta(path)?.title

  return (
    <Box
      bg="background"
      c="text"
      sx={{
        'nav:first-of-type': {
          margin: 0,
        },
      }}
    >
      {data.allDocsYaml.nodes.map((node) => (
        <Box
          el="nav"
          mt="6"
          key={node.section}
          aria-labelledby={getId(node.section)}
        >
          <Text
            py="0"
            px="4"
            variant="highlight"
            c="muted.0"
            id={getId(node.section)}
          >
            {node.section}
          </Text>
          <Box p="0" el="ul">
            {node.paths.map((path) => (
              <Box sx={{ listStyle: 'none' }} el="li" key={path}>
                <Link
                  sx={{
                    display: 'flex',
                    borderRadius: 3,
                    alignItems: 'center',
                    padding: '0.5em 1em 0.5em 2em',
                    textDecoration: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                    ':focus': {
                      outline: 'none',
                      bg: 'text',
                      color: 'primary.contrast',
                    },
                    ':hover:not(:focus)': {
                      color: 'text',
                      bg: 'muted.4',
                    },
                    '&[aria-current="page"]': {
                      bg: 'text',
                      color: 'background',
                    },
                    svg: {
                      marginLeft: '0.25em',
                    },
                  }}
                  to={path}
                >
                  {getTitle(path)}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

interface Data {
  allDocsYaml: {
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
