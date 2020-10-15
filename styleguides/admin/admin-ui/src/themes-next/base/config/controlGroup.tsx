const styles = {
  fontVariationSettings: 'regular',
  lh: 'highlight',
  marginTop: 3,
  marginBottom: 6,
  display: 'flex',
  alignItems: 'flex-start',
  '& > label > input': {
    marginRight: 2,
    marginLeft: 0,
  },
  '& > label': {
    cursor: 'pointer',
    color: 'text',
    display: 'flex',
    alignItems: 'center',
  },
}

export default {
  'controlGroup-horizontal-regular': {
    ...styles,
    fontSize: '2',
    flexDirection: 'row',
    '& label:not(:last-child)': {
      marginRight: 6,
    },
  },
  'controlGroup-horizontal-small': {
    ...styles,
    fontSize: '1',
    flexDirection: 'row',
    '& label:not(:last-child)': {
      marginRight: 5,
    },
  },
  'controlGroup-vertical-regular': {
    ...styles,
    fontSize: '2',
    flexDirection: 'column',
    '& label:not(:last-child)': {
      marginBottom: 4,
    },
  },
  'controlGroup-vertical-small': {
    ...styles,
    fontSize: '1',
    flexDirection: 'column',
    '& label:not(:last-child)': {
      marginBottom: 4,
    },
  },
}
