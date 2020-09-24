const content = {
  paddingX: 5,
  paddingY: 4,
  position: 'relative',
}

const baseArrow = {
  fill: 'primary.contrast',
}

const arrow = {
  top: {
    ...baseArrow,
    filter: 'drop-shadow(0px 4px 3px rgba(61, 62, 64, 0.25))',
  },
  right: {
    ...baseArrow,
    filter: 'drop-shadow(-4px 0px 3px rgba(61, 62, 64, 0.25))',
  },
  bottom: {
    ...baseArrow,
    filter: 'drop-shadow(0px -3px 3px rgba(61, 62, 64, 0.25))',
  },
  left: {
    ...baseArrow,
    filter: 'drop-shadow(4px 0px 3px rgba(61, 62, 64, 0.25))',
  },
}

const popover = {
  backgroundColor: 'primary.contrast',
  boxShadow: '0px 3px 9px rgba(61, 62, 64, 0.25)',
  borderRadius: 3,
  maxWidth: '24rem',
  transition: 'opacity 250ms ease-in-out, transform 250ms ease-in-out',
  transformOrigin: 'top center',
  content,
  arrow,
}

export default popover
