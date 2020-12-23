const styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  padding: 2,
  borderRadius: 'circle',
  textTransform: 'uppercase',
}

export default {
  base: {
    ...styles,
    bg: 'dark.primary',
    color: 'light.primary',
  },
  primary: {
    ...styles,
    bg: 'blue',
    color: 'light.primary',
  },
  danger: {
    ...styles,
    bg: 'red',
    color: 'light.primary',
  },
}
