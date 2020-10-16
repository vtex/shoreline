export default {
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
}
