/* eslint-disable @typescript-eslint/no-explicit-any */
import { SxStyleProp } from 'theme-ui'
import inputStyles from './input'

const styles: SxStyleProp = {
  bg: 'transparent',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  width: '100%',
  height: '100%',
  appearance: 'none',
  border: 'none',
  outline: 'none',
  zIndex: 1,
  fontSize: 2,
  cursor: 'pointer',
  pl: 5,
  color: 'text',
  fontWeight: 'initial',
}

const option: SxStyleProp = {
  fontSize: 1,
  px: 4,
  fontVariationSettings: 'light',
  color: 'black',
  fontFamily: 'sans-serif',
}

const container: SxStyleProp = {
  ...inputStyles.container,
  bg: 'transparent',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  width: 'auto',
}

const arrow: SxStyleProp = {
  position: 'absolute',
  right: 4,
  zIndex: 0,
}

export default {
  ...styles,
  disabled: {
    ...styles,
    cursor: 'not-allowed',
  },
  container,
  option,
  arrow,
} as SxStyleProp
