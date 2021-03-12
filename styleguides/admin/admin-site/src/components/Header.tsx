import React from 'react'
import { Box, Search, useSystem, Flex } from '@vtex/admin-ui'
import { Link } from 'gatsby'
import { VisuallyHidden } from 'reakit'
import { FaGithub } from 'react-icons/fa'

import Logo from '../icons/LogoSkeleton'
import useViewportWidthGreaterThan from '../hooks/useViewportWidthGreaterThan'

import Anchor from './Anchor'
import SkipToContent from './SkipToContent'
import { useSearchContext } from './Search'

export default function Header() {
  const isLarge = useViewportWidthGreaterThan(768)

  const { cn } = useSystem()
  const { searchState } = useSearchContext()

  return (
    <Box
      element="header"
      csx={{
        themeKey: 'components.header',
      }}
    >
      <SkipToContent />
      <Anchor as={Link} to="/">
        <Logo />
        <VisuallyHidden>VTEX</VisuallyHidden>
      </Anchor>
      <Flex
        justify="center"
        align="center"
        csx={{
          flex: 1,
          width: '100%',
        }}
      >
        <Search
          id="search"
          placeholder="Start typing to filter sidebar items"
          csx={{
            width: 400,
          }}
          {...searchState}
        />
      </Flex>
      <Anchor
        href="https://github.com/vtex/onda/tree/master/styleguides/admin/admin-ui"
        target="blank"
      >
        <FaGithub className={cn({ fontSize: '1.2em', marginRight: 2 })} />
        {!isLarge && <VisuallyHidden>GitHub</VisuallyHidden>}
      </Anchor>
    </Box>
  )
}
