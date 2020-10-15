const styles = {
  border: 'solid',
  borderWidth: 1,
  borderColor: 'muted.3',
}

export default {
  horizontal: {
    ...styles,
    marginY: 4,
    borderBottom: 0,
  },
  vertical: {
    ...styles,
    marginX: 4,
    borderLeft: 0,
  },
}
