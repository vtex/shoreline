import React, { useEffect, useState } from 'react'
import { Search, tag } from '@vtex/admin-ui'
import { VisuallyHidden } from 'reakit'
import { FaGithub } from 'react-icons/fa'

import useViewportWidthGreaterThan from '../hooks/useViewportWidthGreaterThan'
import Anchor from './Anchor'
import { useSearchContext } from './Search'

export default function Header() {
  const isLarge = useViewportWidthGreaterThan(768)
  const search = useSearchContext()
  const [border, setBorder] = useState('none')

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setBorder('divider-bottom')
      } else {
        setBorder('none')
      }
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <tag.header
      csx={{
        top: 0,
        height: 64,
        position: 'fixed',
        border,
        color: 'dark.primary',
        bg: 'light.primary',
        width: '80%',
        maxWidth: 'calc(90rem - 10%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 9999,
        paddingX: 4,
        '& > *:not(:last-child)': {
          marginRight: 4,
        },
        "a:not([href^='#'])": {
          display: 'inline-flex',
          alignItems: 'center',
          height: 'calc(100% - 5px)',
          color: 'inherit',
          marginTop: 1,
          borderBottom: '2px solid transparent',
          textTransform: 'uppercase',
          fontSize: '0.875em',
          "&:not([href='/'])": {
            paddingX: 4,
            '&:hover': {
              color: 'blue',
              textDecoration: 'none',
            },
          },
        },
      }}
    >
      <Search
        id="search"
        placeholder="Start typing to filter sidebar items"
        csx={{
          width: 500,
        }}
        state={search}
      />
      <Anchor
        href="https://github.com/vtex/onda/tree/master/styleguides/admin/admin-ui"
        target="blank"
      >
        <tag.i as={FaGithub} csx={{ fontSize: '1.5rem', marginRight: 2 }} />
        {!isLarge && <VisuallyHidden>GitHub</VisuallyHidden>}
      </Anchor>
    </tag.header>
  )
}
