import { Theme, FeedbackPalette } from '@vtex-components/theme'
import { SxStyleProp } from 'theme-ui'

const open: SxStyleProp = {
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  left: '0',
  bottom: '0',
  top: '0',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'muted.4',
  marginTop: '5rem',
  paddingBottom: '5rem',
}

const menu: SxStyleProp = {
  display: ['flex', 'flex', 'flex', 'none'],
  flexDirection: 'column',
  overflowY: 'auto',
  paddingY: 4,
}

const links = {
  height: '30px',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: 'color 0.15s ease-in',
  color: 'secondary.base',
  marginY: 4,
  paddingX: 6,
  fontSize: 3,
}

const activeLink = {
  ...links,
  boxShadow: (theme: Theme) =>
    `inset 3px 0px 0px 0px ${(theme.colors.primary as FeedbackPalette).base}`,
}

const actionButton = {
  zIndex: 0,
  borderTop: 'solid',
  borderTopWidth: '1px',
  borderTopColor: 'muted.3',
  paddingX: 5,
}

const hamburgerMenu: SxStyleProp = {
  display: ['flex', 'flex', 'flex', 'none'],
  width: '5rem',
  height: '100%',
  paddingY: 5,
  justifyContent: 'center',
  alignItems: 'center',
  color: 'primary.base',
  borderLeft: 'solid',
  borderLeftWidth: '1px',
  borderLeftColor: 'muted.3',
  cursor: 'pointer',
  open,
  menu,
  links,
  activeLink,
  actionButton,
}

export default hamburgerMenu
