import colors from '../colors'

export default {
  'text-field': {
    display: 'flex',
    position: 'relative',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    input: {
      paddingTop: 4,
    },
    label: {
      fontSize: 1,
      paddingX: 4,
      paddingTop: 2,
      color: 'muted.0',
      marginBottom: 3,
      pointerEvents: 'none',
      position: 'absolute',
      transform: 'translate(0, 16px) scale(1)',
      transformOrigin: 'top left',
      transition: 'all 0.2s ease-out;',
    },
    ':focus-within > label': {
      transform: 'translate(4px, 4px) scale(0.875)',
      color: 'primary.base',
    },
    'input:placeholder-shown:not(:focus) + label': {
      paddingTop: 1,
    },
    'input:active + label': {
      transform: 'translate(4px, 4px) scale(0.875)',
    },
    'input:not(:placeholder-shown) + label': {
      transform: 'translate(4px, 4px) scale(0.875)',
    },
  },
  input: {
    fontVariationSettings: '"wght" 92',
    width: 'full',
    height: 48,
    paddingX: 4,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'muted.3',
    borderRadius: 4,
    bg: 'inherit',
    marginY: 1,
    fontSize: 1,
    color: 'text',
    outline: 0,
    transition: 'all 150ms cubic-bezier(0.45, 0.25, 0.60, 0.95)',
    ':hover': {
      borderColor: 'muted.2',
    },
    ':focus': {
      borderColor: 'primary.base',
      boxShadow: `inset 0 0 0 1px  ${colors.primary.base}`,
    },
  },
}
