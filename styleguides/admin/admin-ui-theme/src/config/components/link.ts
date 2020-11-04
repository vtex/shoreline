const styles = {
  color: 'primary.base',
  bg: 'primary.base',
  textDecoration: 'none',
  fontWeight: 'regular.fontWeight',
  '&.active': {
    color: 'primary.active',
  },
  '&.hover': {
    color: 'primary.hover',
  },
  '&.visited': {
    color: 'primary.active',
  },
}

const primary = {
  ...styles,
}

const underlined = {
  ...styles,
  textDecoration: 'underline',
}

export default {
  primary,
  underlined,
}
