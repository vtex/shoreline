import { colors } from '../base'

export default {
  fontVariationSettings: '"wght" 92',
  width: 'full',
  height: 48,
  paddingX: 4,
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'muted.3',
  borderRadius: 'default',
  bg: 'inherit',
  marginY: 1,
  fontSize: 1,
  color: 'text',
  outline: 0,
  transition: 'snap',
  ':hover': {
    borderColor: 'muted.2',
  },
  ':focus': {
    borderColor: 'primary.base',
    boxShadow: `inset 0 0 0 1px  ${colors.primary.base}`,
  },
}
