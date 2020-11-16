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
    bg: 'text.primary',
    color: 'background',
  },
  primary: {
    ...styles,
    bg: 'primary.base',
    color: 'primary.accent',
  },
  danger: {
    ...styles,
    bg: 'danger.base',
    color: 'danger.accent',
  },
}
