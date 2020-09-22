const brand = {
  alignItems: 'center',
  color: 'primary.base',
  justifyContent: 'center',
  gridArea: 'brand',
  marginX: 4,
}

const linksBase = {
  minWidth: 'max-content',
  textDecoration: 'none',
  transition: 'color 0.15s ease-in',
  marginX: 5,
  paddingX: 1,
  '&:hover': {
    color: 'primary.base',
  },
  paddingY: '1.825rem',
}

const links = {
  active: {
    ...linksBase,
    color: 'primary.base',
    borderBottom: 'solid',
    borderBottomWidth: '0.15rem',
    borderBottomColor: 'primary.base',
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
  links,
}

const rightLinks = {
  display: ['none', 'none', 'none', 'flex'],
  gridArea: 'rightlinks',
  width: '100%',
  justifyContent: 'flex-end',
  textTransform: 'uppercase',
  '> a': {
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
  gridTemplateColumns: '1fr 4.25fr 2fr 2fr 0.75fr',
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
