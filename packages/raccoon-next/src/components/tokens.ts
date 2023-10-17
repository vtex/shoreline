const colors = {
  gray05: '#F4F4F4',
  gray10: '#E6E6E6',
  gray20: '#DDDDDD',
  gray30: '#B9B9B9',
  gray40: '#747474',
  gray50: '#545454',
  gray60: '#3B3B3B',
}

const bg = {
  secondary: colors.gray05,
  skeleton: `linear-gradient(90deg, transparent, ${colors.gray10}, transparent)`,
}

const radii = {
  default: '4px',
}

export const tokens = {
  colors,
  bg,
  radii,
}
