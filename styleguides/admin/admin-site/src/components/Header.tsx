// TODO: Refactor this mess
import * as React from 'react'
import { Link } from 'gatsby'
import { css } from 'emotion'
import { Global } from '@emotion/core'
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
import { usePalette, useFade } from 'reakit-system-palette/utils'
import { LinkGetProps } from '@reach/router'
import { Box } from '@vtex/admin-ui'

import Logo from '../icons/LogoSkeleton'
import useViewportWidthGreaterThan from '../hooks/useViewportWidthGreaterThan'
import useLocation from '../hooks/useLocation'
import track from '../utils/track'
import Anchor from './Anchor'
import SkipToContent from './SkipToContent'
import Spacer from './Spacer'
import HiddenMediaQuery from './HiddenMediaQuery'
import DocsNavigation from './DocsNavigation'

export type HeaderProps = {
  transparent?: boolean
}

function getLinkProps({ isPartiallyCurrent }: LinkGetProps) {
  if (isPartiallyCurrent) {
    return { 'aria-current': 'page' }
  }

  return {}
}

export default function Header({ transparent }: HeaderProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isLarge = useViewportWidthGreaterThan(768)
  const foreground = usePalette('foreground')
  const primary = usePalette('primary')
  const boxShadowColor = useFade(foreground, 0.85)
  const dialog = useDialogState({ animated: true })
  const location = useLocation()

  React.useEffect(dialog.hide, [location.pathname])
  const transparentStyle = transparent
    ? { background: 'transparent', color: 'background' }
    : { boxShadow: `0 1px 2px ${boxShadowColor}` }

  return (
    <>
      <Box
        el="header"
        position="fixed"
        top="0"
        left="0"
        w="full"
        h={60}
        display="flex"
        items="center"
        bg="background"
        sx={{
          zIndex: 910,
          padding: '0 56px',
          willChange: 'background',
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
            color: 'inherit',
            fontWeight: 400,
            marginTop: '5px',
            borderBottom: '5px solid transparent',
            textTransform: 'uppercase',
            fontSize: '0.875em',
            "&:not([href='/'])": {
              padding: '0 1em',
              '&:hover': {
                color: transparent ? 'white' : primary,
                textDecoration: transparent ? 'underline' : 'none',
              },
              "&[aria-current='page']": {
                color: primary,
                borderColor: primary,
              },
            },
          },
          ...transparentStyle,
        }}
      >
        <Global
          styles={{
            ':root': {
              '--header-height': '60px',
            },
          }}
        />
        <SkipToContent />
        <HiddenMediaQuery query="min-width: 769px">
          <DialogDisclosure
            {...dialog}
            unstable_system={{ palette: 'background' }}
            className={css`
              background: transparent;
              color: inherit;
              font-size: 20px;
              padding: 8px;
              border-radius: 50%;
              border: none;
            `}
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
            className={css`
              top: 0;
              left: 0;
              height: 100vh;
              margin: 0;
              max-height: initial;
              transform: translateX(0);
              transition: transform 250ms ease-in-out;
              border-radius: 0;
              overflow: auto;
              -webkit-overflow-scrolling: touch;
              transform: translateX(-100%);
              &[data-enter] {
                transform: translateX(0);
              }
            `}
          >
            <DocsNavigation />
          </Dialog>
        </HiddenMediaQuery>
        <Anchor as={Link} to="/">
          <Logo colored={!transparent} />
          <VisuallyHidden>Reakit</VisuallyHidden>
        </Anchor>
        <Box sx={{ flex: 1 }} />
        <HiddenMediaQuery query="max-width: 768px">
          {(props) => (
            <Anchor
              as={Link}
              to="/docs/"
              getProps={getLinkProps}
              {...props}
              onClick={track('reakit.headerGuideClick')}
            >
              Documentation
            </Anchor>
          )}
        </HiddenMediaQuery>
        <Anchor
          href="https://github.com/vtex/onda/tree/master/stylesguides/admin/admin-ui"
          onClick={track('reakit.headerGithubClick')}
        >
          <FaGithub style={{ fontSize: '1.2em' }} />
          <HiddenMediaQuery query="max-width: 900px">
            <Spacer width={8} />
            GitHub
          </HiddenMediaQuery>
          {!isLarge && <VisuallyHidden>GitHub</VisuallyHidden>}
        </Anchor>
      </Box>
    </>
  )
}
