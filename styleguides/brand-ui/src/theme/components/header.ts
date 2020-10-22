import { Theme, FeedbackPalette } from '@vtex-components/theme'

const brand = {
  alignItems: 'center',
  color: 'primary.base',
  justifyContent: 'center',
  gridArea: 'brand',
  marginX: 4,
  '> div': {
    display: ['flex', 'flex', 'flex', 'none'],
    boxShadow: `inset 1px 0px 0px 0px`,
    paddingLeft: 3,
    marginLeft: 3,
  },
}

const linksBase = {
  display: 'flex',
  height: '100%',
  minWidth: 'max-content',
  textDecoration: 'none',
  transition: 'all 0.15s ease-in',
  marginX: 5,
  '&:hover': {
    color: 'primary.base',
  },
  alignItems: 'center',
  fontSize: 2,
}

const links = {
  active: {
    ...linksBase,
    color: 'primary.base',
    boxShadow: (theme: Theme) =>
      `inset 0 -3px 0px 0px ${(theme.colors.primary as FeedbackPalette).base}`,
  },
  noActive: {
    ...linksBase,
    color: 'secondary.base',
  },
}

const leftLinks = {
  display: ['none', 'none', 'none', 'flex'],
  gridArea: 'leftlinks',
  width: '100%',
  height: '100%',
  links,
}

const rightLinks = {
  display: ['none', 'none', 'none', 'flex'],
  gridArea: 'rightlinks',
  width: '100%',
  justifyContent: 'flex-end',
  textTransform: 'uppercase',
  '> a': {
    display: 'flex',
    minWidth: 'max-content',
    textDecoration: 'none',
    transition: 'color 0.15s ease-in',
    color: 'muted.0',
    marginX: 4,
    paddingX: 1,
    fontSize: 1,
    fontWeight: 'medium',
    '&:hover': {
      color: 'primary.base',
    },
  },
}

const actionButton = {
  gridArea: 'actionbutton',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'flex-end',
}

const header = {
  display: ['flex', 'flex', 'flex', 'grid'],
  width: '100vw',
  height: '5rem',
  position: 'fixed',
  top: '0',
  left: '0',
  alignItems: 'center',
  justifyContent: 'space-between',
  gridTemplateColumns: '1fr 4.25fr 2fr 2fr minmax(6.75rem, auto)',
  gridTemplateAreas: '"brand leftlinks search rightlinks actionbutton"',
  backgroundColor: 'primary.contrast',
  borderBottom: 'solid',
  borderBottomWidth: '1px',
  borderBottomColor: 'muted.3',
  brand,
  leftLinks,
  rightLinks,
  actionButton,
}

export default header
