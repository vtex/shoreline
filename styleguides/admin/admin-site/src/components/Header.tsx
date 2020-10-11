/** @jsx jsx */
import { jsx, Box } from '@vtex/admin-ui'
import { useRef, useEffect } from 'react'
import { Link } from 'gatsby'
import { css } from 'emotion'
import {
  VisuallyHidden,
  DialogDisclosure,
  useDialogState,
  Dialog,
  DialogBackdrop,
  Portal,
} from 'reakit'
import { FaGithub } from 'react-icons/fa'
import { MdMenu } from 'react-icons/md'
import { LinkGetProps } from '@reach/router'

import Logo from '../icons/LogoSkeleton'
import useViewportWidthGreaterThan from '../hooks/useViewportWidthGreaterThan'
import useLocation from '../hooks/useLocation'
import Anchor from './Anchor'
import SkipToContent from './SkipToContent'
import Spacer from './Spacer'
import HiddenMediaQuery from './HiddenMediaQuery'
import DocsNavigation from './DocsNavigation'

export type HeaderProps = {
  isHome?: boolean
}

function getLinkProps({ isPartiallyCurrent }: LinkGetProps) {
  if (isPartiallyCurrent) {
    return { 'aria-current': 'page' }
  }

  return {}
}

export default function Header({ isHome }: HeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isLarge = useViewportWidthGreaterThan(768)
  const dialog = useDialogState({ animated: true })
  const location = useLocation()

  useEffect(dialog.hide, [location.pathname])

  return (
    <Box
      el="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 'full',
        height: 60,
        display: 'flex',
        alignContent: 'center',
        bg: isHome ? 'black' : 'background',
        zIndex: 910,
        padding: '0 56px',
        boxShadow: 'subtle',
        '& > *:not(:last-child)': {
          marginRight: 4,
        },
        '@media (max-width: 768px)': {
          padding: '0 8px',
          transform: 'initial',
          height: 60,
          '> *:not(:last-child)': {
            marginRight: '8px',
          },
          a: {
            fontSize: '1em !important',
          },
        },
        "a:not([href^='#'])": {
          display: 'inline-flex',
          alignItems: 'center',
          height: 'calc(100% - 5px)',
          color: isHome ? 'muted.4' : 'inherit',
          marginTop: 1,
          borderBottom: '2px solid transparent',
          textTransform: 'uppercase',
          fontSize: '0.875em',
          "&:not([href='/'])": {
            paddingX: 4,
            '&:hover': {
              color: isHome ? 'primary.washed.2' : 'primary.hover',
              textDecoration: 'none',
              borderColor: isHome ? 'primary.washed.2' : 'primary.washed.1',
            },
            "&[aria-current='page']": {
              color: 'primary.base',
              borderColor: 'primary.base',
            },
          },
        },
      }}
    >
      <SkipToContent />
      <HiddenMediaQuery query="min-width: 769px">
        <DialogDisclosure
          {...dialog}
          unstable_system={{ palette: 'background' }}
          sx={{
            background: 'transparent',
            color: 'inherit',
            fontSize: '20px',
            padding: 2,
            borderRadius: '50%',
            border: 'none',
          }}
        >
          <MdMenu />
          <VisuallyHidden>Open sidebar</VisuallyHidden>
        </DialogDisclosure>
        <Portal>
          <DialogBackdrop {...dialog} animated={false} />
        </Portal>
        <Dialog
          {...dialog}
          ref={ref}
          aria-label="Sidebar"
          unstable_initialFocusRef={ref}
          sx={{
            top: 0,
            left: 0,
            height: '100vh',
            margin: 0,
            maxHeight: 'initial',
            transition: 'transform 250ms ease-in-out',
            borderRadius: 0,
            overflow: 'auto',
            transform: 'translateX(-100%)',
            '&[data-enter]': {
              transform: 'translateX(0)',
            },
          }}
          className={css`
            transform: translateX(-100%);
          `}
        >
          <DocsNavigation />
        </Dialog>
      </HiddenMediaQuery>
      <Anchor as={Link} to="/">
        <Logo />
        <VisuallyHidden>Reakit</VisuallyHidden>
      </Anchor>
      <Box sx={{ flex: 1 }} />
      <HiddenMediaQuery query="max-width: 768px">
        {(props) => (
          <Anchor as={Link} to="/docs/" getProps={getLinkProps} {...props}>
            Documentation
          </Anchor>
        )}
      </HiddenMediaQuery>
      <Anchor
        href="https://github.com/vtex/onda/tree/master/stylesguides/admin/admin-ui"
        target="blank"
      >
        <FaGithub style={{ fontSize: '1.2em' }} />
        <HiddenMediaQuery query="max-width: 900px">
          <Spacer width={8} />
          GitHub
        </HiddenMediaQuery>
        {!isLarge && <VisuallyHidden>GitHub</VisuallyHidden>}
      </Anchor>
    </Box>
  )
}
