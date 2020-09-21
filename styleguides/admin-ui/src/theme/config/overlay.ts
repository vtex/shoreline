export default {
  menu: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'background',
    marginTop: 4,
    padding: 5,
    minWidth: 20,
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'muted.2',
    '> button': {
      color: 'text',
      ':hover': {
        color: 'text',
      },
      width: 'full',
      div: {
        justifyContent: 'flex-start',
      },
    },
  },
}
