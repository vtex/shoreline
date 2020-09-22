const brand = {
  alignItems: 'center',
  color: 'primary.base',
  padding: '0.75rem',
  gridArea: 'brand',
}

const leftLinks = {
  display: ['none', 'none', 'none', 'flex'],
  gridArea: 'leftlinks',
  width: '100%',
  marginTop: ['0.75rem', 0, 0],
  paddingTop: ['0.75rem', 0, 0],
  '> a': {
    minWidth: 'max-content',
    textDecoration: 'none',
    transition: 'color 0.15s ease-in',
    marginX: 5,
    paddingX: 1,
    paddingY: '1.875rem',
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
  marginTop: ['0.75rem', 0, 0],
  paddingTop: ['0.75rem', 0, 0],
  textTransform: 'uppercase',
  '> a': {
    minWidth: 'max-content',
    textDecoration: 'none',
    transition: 'color 0.15s ease-in',
    color: 'muted.0',
    marginX: 4,
    paddingX: 1,
    fontSize: '0.875rem',
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
