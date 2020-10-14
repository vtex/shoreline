// TODO Refactor Tooltip (arrow Icon, use admin's tooltip)
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
          nightly
        }
      }
    }
  }
`

const linkStyles: SxStyleProp = {
  display: 'flex',
  justifyContent: 'space-between',
  width: 'full',
  borderRadius: 3,
  alignItems: 'center',
  // padding: '0.5em 1em 0.5em 2em',
  paddingY: 2,
  paddingX: 2,
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
  marginY: '2px',
  ':hover:not(:focus)': {
    bg: 'primary.washed.0',
    color: 'text',
  },
  '&[aria-current="page"]': {
    bg: 'primary.washed.2',
    borderLeftColor: 'primary.base',
    borderLeftStyle: 'solid',
    borderLeftWidth: 4,
    color: 'text',
  },
  ':focus': {
    bg: 'primary.washed.2',
    color: 'text',
    outline: 'none',
  },
  svg: {
    height: 20,
    width: 20,
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
      <Tooltip
        sx={{
          bg: 'text',
          color: 'background',
          padding: 2,
          borderRadius: 4,
        }}
        {...tooltip}
      >
        <Text el="span" variant="small">
          <TooltipArrow {...tooltip} />
          Nightly
        </Text>
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
      {data.allNavigationYaml.nodes.map((node) => (
        <nav
          sx={{
            marginTop: 4,
          }}
          key={node.section}
          aria-labelledby={getId(node.section)}
        >
          <Text
            py="0"
            px="0"
            variant="highlight"
            c="muted.0"
            id={getId(node.section)}
          >
            {node.section}
          </Text>
          <ul sx={{ padding: 0 }}>
            {node.paths.map((path) => (
              <li
                sx={{
                  listStyle: 'none',
                  display: 'flex',
                  width: 'full',
                  justifyContent: 'space-between',
                }}
                key={path}
              >
                {getIsExperimental(path) ? (
                  <ExperimentalLink to={path}>
                    {getTitle(path)}
                  </ExperimentalLink>
                ) : (
                  <Link sx={linkStyles} to={path}>
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
        nightly?: boolean
      }
    }>
  }
}
