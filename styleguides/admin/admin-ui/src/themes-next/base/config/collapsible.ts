export default {
  container: {
    bg: 'background',
    borderColor: 'muted.3',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 6,
    paddingLeft: 3,
    'div > button:nth-of-type(n+2)': {
      marginLeft: 1,
    },
  },
  section: {
    paddingX: 6,
    paddingBottom: 6,
  },
}
