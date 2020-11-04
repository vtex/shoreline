import React from 'react'
import { Box, VisuallyHidden, Divider, cn } from '@vtex/admin-ui'
import { useStaticQuery, graphql, Link } from 'gatsby'

const query = graphql`
  query DocsBackNextQuery {
    allMarkdownRemark {
      nodes {
        title
        frontmatter {
          path
        }
      }
    }
  }
`

export default function DocsBackNext({
  nextPath,
  prevPath,
}: DocsBackNextProps) {
  const data: Data = useStaticQuery(query)

  const findMeta = (path: string) =>
    data.allMarkdownRemark.nodes.find((node) => node.frontmatter.path === path)

  const getTitle = (path: string) => findMeta?.(path)?.title

  return (
    <Box
      styles={{
        color: 'text',
        li: {
          listStyle: 'none',
        },
        a: {
          display: 'flex',
          alignItems: 'center',
          paddingY: 2,
          paddingX: 4,
          textDecoration: 'none',
          color: 'inherit',
          cursor: 'pointer',
          '&:hover': {
            color: 'primary.hover',
          },
        },
      }}
    >
      <nav className={cn({ margin: '3em 0 0 0' })}>
        <Divider orientation="horizontal" />
        <ul className={cn({ padding: 0, display: 'flex' })}>
          {prevPath && (
            <li>
              <Link to={prevPath}>
                <VisuallyHidden>Previous </VisuallyHidden>
                {getTitle(prevPath)}
              </Link>
            </li>
          )}
          {nextPath && (
            <li className={cn({ marginLeft: 'auto' })}>
              <Link to={nextPath}>
                <VisuallyHidden>Next </VisuallyHidden>
                {getTitle(nextPath)}
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </Box>
  )
}

type DocsBackNextProps = { nextPath: string; prevPath: string }

type Data = {
  allMarkdownRemark: {
    nodes: Array<{
      title: string
      frontmatter: {
        path: string
      }
    }>
  }
}
