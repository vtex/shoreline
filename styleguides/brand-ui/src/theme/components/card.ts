const baseCard = {
  bg: 'primary.contrast',
  flexDirection: 'column',
  borderRadius: 3,
  boxShadow: '0px 3px 9px rgba(61, 62, 64, 0.25)',
  '& > img': { padding: 0 },
}

const card = {
  small: {
    ...baseCard,
    '& > div': { paddingX: 4 },
    paddingBottom: 4,
    paddingTop: 4,
  },
  regular: {
    ...baseCard,
    '& > div': {
      paddingX: 5,
    },
    paddingBottom: 6,
    paddingTop: 6,
  },
  header: {
    fontSize: 3,
    paddingBottom: 4,
  },
  footer: {
    paddingTop: 4,
    fontSize: 2,
  },
  body: {
    fontSize: 2,
  },
}

export default card
