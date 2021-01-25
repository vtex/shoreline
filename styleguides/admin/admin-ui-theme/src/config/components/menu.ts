import { alpha } from '@vtex/admin-ui-system'

import { space } from '../base'

const itemStyles = {
  marginY: '2px',
  paddingX: 1,
  fontSize: 1,
  border: 'none',
  textTransform: 'initial',
  width: 'full',
  div: {
    justifyContent: 'flex-start',
  },
  svg: {
    marginLeft: 0,
    marginRight: 2,
  },
}

export default {
  display: 'flex',
  flexDirection: 'column',
  bg: 'light.primary',
  marginTop: 1,
  padding: 3,
  minWidth: 18,
  borderRadius: 3,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'mid.secondary',
  boxShadow: 'menu',
  hr: {
    marginY: 2,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderColor: 'mid.secondary',
    width: `calc(100% -${space[3]})`,
    marginX: `-${space[3]}`,
    outline: 'none',
  },
  item: {
    ...itemStyles,
    color: 'dark.primary',
    ':focus': {
      bg: alpha('blue.secondary.default', 0.32),
      outline: 'none',
      boxShadow: 'none',
    },
    ':hover': {
      color: 'dark.primary',
    },
  },
  'item-dangerous': {
    ...itemStyles,
    color: 'red',
    ':focus': {
      bg: alpha('red.secondary.default', 0.32),
      outline: 'none',
      boxShadow: 'none',
    },
    ':hover': {
      color: 'red',
    },
  },
}
