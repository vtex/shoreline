import {
  bgTokens,
  fgTokens,
  borderTokens,
  shadowTokens,
  defaultTheme,
  get,
  extractTokenCall,
} from '@vtex/admin-ui'

function createMap(prop: string, tokenCall: string) {
  return function map(token: string) {
    const formatedToken = `${tokenCall}.${extractTokenCall(token)}`

    return {
      token: `$${formatedToken}`,
      description: '',
      value: get(defaultTheme, formatedToken, '-'),
      type: prop,
      csx: {
        [`${prop}`]: token,
      },
    }
  }
}

export const background = bgTokens.map(createMap('background', 'bg'))
export const foreground = fgTokens.map(createMap('color', 'fg'))
export const border = borderTokens.map(createMap('border', 'border'))
export const shadow = shadowTokens.map(createMap('boxShadow', 'shadow'))

export const tokens = [...background, ...foreground, ...border, ...shadow]
