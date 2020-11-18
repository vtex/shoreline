// TODO Refactor Tooltip (arrow Icon, use admin's tooltip)
import React, { Fragment, Ref } from 'react'
import { Box, cn, Text } from '@vtex/admin-ui'
import { useStaticQuery, graphql, Link, GatsbyLinkProps } from 'gatsby'
import {
  unstable_useId as useId,
  useTooltipState,
  TooltipReference,
  Tooltip,
  TooltipArrow,
} from 'reakit'
import kebabCase from 'lodash/kebabCase'

import Next from '../icons/Next'

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
          next
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
  // padding: '0.5em 1em 0.5em 2em',
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

function ExperimentalLink(props: GatsbyLinkProps<{}>) {
  const { unstable_referenceRef: ref, ...tooltip } = useTooltipState({
    placement: 'right',
    // eslint-disable-next-line @typescript-eslint/camelcase
    unstable_fixed: true,
  })

  return (
    <Fragment>
      <TooltipReference
        as={Link}
        className={cn(linkStyles)}
        {...props}
        {...tooltip}
      >
        {props.children}
        <Next
          role="presentation"
          ref={(ref as unknown) as Ref<SVGSVGElement>}
        />
      </TooltipReference>
      <Tooltip
        className={cn({
          bg: 'text.primary',
          color: 'background',
          padding: 2,
          borderRadius: 4,
        })}
        {...tooltip}
      >
        <Text variant="small">
          <TooltipArrow {...tooltip} />
          Next
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
    Boolean(findMeta(path)?.frontmatter.next)

  return (
    <Box
      styles={{
        'nav:first-of-type': {
          margin: 0,
        },
      }}
    >
      {data.allNavigationYaml.nodes.map((node) => (
        <nav
          className={cn({
            marginTop: 4,
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
            {node.paths.map((path) => (
              <li
                className={cn({
                  listStyle: 'none',
                  display: 'flex',
                  width: 'full',
                  justifyContent: 'space-between',
                })}
                key={path}
              >
                {getIsExperimental(path) ? (
                  <ExperimentalLink to={path}>
                    {getTitle(path)}
                  </ExperimentalLink>
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
        next?: boolean
      }
    }>
  }
}
