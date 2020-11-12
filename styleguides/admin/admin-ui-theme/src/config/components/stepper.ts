const styles = {
  display: 'flex',
  alignItems: 'center',
  height: 48,
  width: 106,
  paddingLeft: 12,
  paddingRight: 12,
  paddingY: 14,
}

export default {
  disable: { ...styles, backgroundColor: 'muted.4' },
  usual: {
    ...styles,
    backgroundColor: 'primary.contrast',
    borderColor: '898F9E',
  },
}
