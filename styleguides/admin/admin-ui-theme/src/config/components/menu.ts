import { space } from '../base'

export default {
  display: 'flex',
  flexDirection: 'column',
  bg: 'background',
  marginTop: 1,
  padding: 3,
  minWidth: 18,
  borderRadius: 3,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'muted.1',
  boxShadow: 'menu',
  hr: {
    marginY: 2,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderColor: 'muted.1',
    width: `calc(100% -${space[3]})`,
    marginX: `-${space[3]}`,
    outline: 'none',
  },
  '> button': {
    marginY: '2px',
    paddingX: 1,
    color: 'text.primary',
    fontSize: 1,
    border: 'none',
    textTransform: 'initial',
    ':focus': {
      bg: 'secondary.base',
      outline: 'none',
      boxShadow: 'none',
    },
    ':hover': {
      color: 'text.primary',
    },
    width: 'full',
    div: {
      justifyContent: 'flex-start',
    },
    svg: {
      marginLeft: 0,
      marginRight: 2,
    },
  },
}
