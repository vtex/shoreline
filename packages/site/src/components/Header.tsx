import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogDisclosure,
  useDialogState,
} from 'reakit/Dialog'
import { navigate } from 'gatsby-link'
import {
  tag,
  get,
  unstableSearchBox as SearchBox,
  unstableUseSearchBoxState as useSearchBoxState,
  IconSearch,
  Paragraph,
} from '@vtex/admin-ui'
import { FaGithub } from 'react-icons/fa'
import { usePaths } from './Sidebar'

import Anchor from './Anchor'
import Logo from '../icons/Logo'

export default function Header() {
  const dialog = useDialogState()
  const { paths } = usePaths()
  const searchState = useSearchBoxState({
    id: 'basic',
    collection: paths,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return

      const { to } = selectedItem

      navigate(to)

      dialog.hide()
    },
    itemToString: (item) => item?.title ?? '',
    compare: (a, b) => a?.title === b?.title,
  })

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
        height: 52,
        position: 'fixed',
        border,
        color: 'header',
        bg: 'rgba(240,240,240,0.7)',
        backdropFilter: 'saturate(180%) blur(20px)',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
              color: '$action.main.tertiaryHover',
              textDecoration: 'none',
            },
          },
        },
      }}
    >
      <tag.div
        csx={{
          width: '100%',
          maxWidth: '89rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo />
        <tag.button
          as={DialogDisclosure}
          csx={{
            width: '14rem',
            height: '2rem',
            bg: (theme) => get(theme, 'colors.grayTransparent10'),
            color: 'base',
            borderRadius: 'default',
            text: 'body',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            'svg + p': {
              marginLeft: 2,
            },
            cursor: 'pointer',
            ':focus:not([data-focus-visible-added])': {
              outline: 'none',
              boxShadow: 'none',
            },
            ':focus': {
              outline: 'none',
              boxShadow: 'focus',
            },
            ':hover': {
              bg: (theme) => get(theme, 'colors.grayTransparent20'),
            },
            ':active': {
              bg: (theme) => get(theme, 'colors.grayTransparent30'),
            },
          }}
          state={dialog}
        >
          <IconSearch />
          <Paragraph>Search for pages</Paragraph>
        </tag.button>
        <tag.div
          as={DialogBackdrop}
          csx={{
            bg: (theme) => get(theme, 'colors.grayTransparent40'),
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 9999,
          }}
          state={dialog}
        >
          <tag.div
            as={Dialog}
            csx={{
              position: 'absolute',
              top: '0.75rem',
              width: '42.5rem',
              left: '50%',
              marginLeft: '-21.25rem',
              ':focus': {
                outline: 'none',
              },
            }}
            state={dialog}
          >
            <SearchBox state={searchState}>
              <SearchBox.Input />
              <SearchBox.Menu>
                <SearchBox.Suggestion>
                  {(item) => item.title}
                </SearchBox.Suggestion>
              </SearchBox.Menu>
              <SearchBox.Footer />
            </SearchBox>
          </tag.div>
        </tag.div>
        <Anchor href="https://github.com/vtex/onda/" target="blank">
          <tag.i as={FaGithub} csx={{ fontSize: '1.5rem', marginRight: 2 }} />
          Github
        </Anchor>
      </tag.div>
    </tag.header>
  )
}
