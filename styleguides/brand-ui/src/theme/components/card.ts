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
}

export default card
