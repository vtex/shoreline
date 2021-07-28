const styles = {
  fontSettings: 'regular',
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
    color: 'dark.secondary',
    display: 'flex',
    alignItems: 'center',
  },
}

export default {
  'horizontal-regular': {
    ...styles,
    fontSize: '2',
    flexDirection: 'row',
    '& label:not(:last-child)': {
      marginRight: 6,
    },
  },
  'horizontal-small': {
    ...styles,
    fontSize: '1',
    flexDirection: 'row',
    '& label:not(:last-child)': {
      marginRight: 5,
    },
  },
  'vertical-regular': {
    ...styles,
    fontSize: '2',
    flexDirection: 'column',
    '& label:not(:last-child)': {
      marginBottom: 4,
    },
  },
  'vertical-small': {
    ...styles,
    fontSize: '1',
    flexDirection: 'column',
    '& label:not(:last-child)': {
      marginBottom: 4,
    },
  },
}
