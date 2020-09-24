const styles = {
  fontVariationSettings: 'regular',
  lh: 'highlight',
  marginTop: '7',
  marginBottom: '13',
  display: 'flex',
  alignItems: 'flex-start',
  '& > label > input': {
    marginRight: 5,
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
      marginRight: 13,
    },
  },
  'controlGroup-horizontal-small': {
    ...styles,
    fontSize: '1',
    flexDirection: 'row',
    '& label:not(:last-child)': {
      marginRight: 11,
    },
  },
  'controlGroup-vertical-regular': {
    ...styles,
    fontSize: '2',
    flexDirection: 'column',
    '& label:not(:last-child)': {
      marginBottom: 9,
    },
  },
  'controlGroup-vertical-small': {
    ...styles,
    fontSize: '1',
    flexDirection: 'column',
    '& label:not(:last-child)': {
      marginBottom: 9,
    },
  },
}
