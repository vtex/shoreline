const styles = {
  border: 'solid',
  borderWidth: 1,
  borderColor: 'mid.tertiary',
  margin: 0,
}

export default {
  horizontal: {
    ...styles,
    borderBottom: 0,
  },
  vertical: {
    ...styles,
    borderLeft: 0,
  },
}
