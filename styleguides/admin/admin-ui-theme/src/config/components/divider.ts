const styles = {
  border: 'solid',
  borderWidth: 1,
  borderColor: 'muted.3',
}

export default {
  horizontal: {
    ...styles,
    marginY: 0,
    borderBottom: 0,
  },
  vertical: {
    ...styles,
    marginX: 0,
    borderLeft: 0,
  },
}
