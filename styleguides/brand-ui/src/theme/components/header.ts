const brand = {
  alignItems: 'center',
  color: 'primary.base',
  justifyContent: 'center',
  gridArea: 'brand',
}

const leftLinks = {
  display: ['none', 'none', 'none', 'flex'],
  gridArea: 'leftlinks',
  width: '100%',
  '> a': {
    minWidth: 'max-content',
    textDecoration: 'none',
    transition: 'color 0.15s ease-in',
    marginX: 5,
    paddingX: 1,
    color: 'secondary.base',
    '&:hover': {
      color: 'primary.base',
    },
  },
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
  height: '5.1rem',
  position: 'fixed',
  top: '0',
  left: '0',
  alignItems: 'center',
  justifyContent: 'space-between',
  gridTemplateColumns: '0.75fr 4.5fr 2fr 2fr 0.75fr',
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
