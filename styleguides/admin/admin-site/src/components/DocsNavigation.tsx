/** @jsx jsx */
import { jsx, Box, Text, SxStyleProp } from '@vtex/admin-ui'
import { Fragment, Ref } from 'react'
import { useStaticQuery, graphql, Link, GatsbyLinkProps } from 'gatsby'
import {
  unstable_useId as useId,
  useTooltipState,
  TooltipReference,
  Tooltip,
  TooltipArrow,
} from 'reakit'
import kebabCase from 'lodash/kebabCase'

import Nightly from '../icons/Nightly'

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
          nightly
        }
      }
    }
  }
`

const linkStyles: SxStyleProp = {
  display: 'flex',
  borderRadius: 3,
  alignItems: 'center',
  padding: '0.5em 1em 0.5em 2em',
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
  marginX: 2,
  marginY: 1,
  height: 44,
  ':focus': {
    outline: 'none',
    bg: 'muted.3',
    color: 'text',
  },
  ':hover:not(:focus)': {
    color: 'text',
    bg: 'muted.4',
  },
  '&[aria-current="page"]': {
    bg: 'muted.3',
    color: 'text',
  },
  svg: {
    marginLeft: 2,
    height: 24,
    width: 24,
  },
}

function ExperimentalLink(props: GatsbyLinkProps<{}>) {
  const { unstable_referenceRef: ref, ...tooltip } = useTooltipState({
    placement: 'right',
    // eslint-disable-next-line @typescript-eslint/camelcase
    unstable_fixed: true,
  })

  return (
    <Fragment>
      <TooltipReference as={Link} sx={linkStyles} {...props} {...tooltip}>
        {props.children}
        <Nightly
          role="presentation"
          ref={(ref as unknown) as Ref<SVGSVGElement>}
        />
      </TooltipReference>
      <Tooltip sx={{ bg: 'text' }} {...tooltip}>
        <TooltipArrow {...tooltip} /> Nightly
      </Tooltip>
    </Fragment>
  )
}

export default function DocsNavigation() {
  const data: Data = useStaticQuery(query)
  const { id: baseId } = useId({ baseId: 'docs-navigation' })

  const getId = (section: string) => `${baseId}-${kebabCase(section)}`
  const findMeta = (path: string) =>
    data.allMarkdownRemark.nodes.find((node) => node.frontmatter.path === path)

  const getTitle = (path: string) => findMeta(path)?.title

  const getIsExperimental = (path: string) =>
    Boolean(findMeta(path)?.frontmatter.nightly)

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
                {getIsExperimental(path) ? (
                  <ExperimentalLink to={path}>
                    {getTitle(path)}
                  </ExperimentalLink>
                ) : (
                  <Link sx={linkStyles} to={path}>
                    {getTitle(path)}
                  </Link>
                )}
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
        nightly?: boolean
      }
    }>
  }
}
