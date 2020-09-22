const baseCard = {
  bg: 'primary.contrast',
  flexDirection: 'column',
  borderRadius: 3,
  boxShadow: '0px 3px 9px rgba(61, 62, 64, 0.25)',
}

const card = {
  small: { ...baseCard, padding: 4 },
  regular: { ...baseCard, paddingX: 5, paddingY: 6 },
  noPadding: { ...baseCard, padding: 0 },
  header: {
    fontSize: 3,
    marginBottom: 4,
  },
  footer: {
    fontSize: 2,
    marginTop: 4,
  },
  body: {
    fontSize: 2,
  },
}

export default card
