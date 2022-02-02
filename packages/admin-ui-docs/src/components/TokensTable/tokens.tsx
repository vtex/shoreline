import React from 'react'
import {
  bgTokens,
  fgTokens,
  borderTokens,
  shadowTokens,
  defaultTheme,
  get,
  extractTokenCall,
  textTokens,
  Set,
  Text,
} from '@vtex/admin-ui'

function createMap(
  prop: string,
  tokenCall: string,
  fotmatValue = (v: any) => v
) {
  return function map(token: string) {
    const formatedToken = `${tokenCall}.${extractTokenCall(token)}`

    return {
      token: `$${extractTokenCall(token)}`,
      formatedToken,
      description: '',
      value: fotmatValue(get(defaultTheme, formatedToken, '-')),
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

export const text = textTokens.map(
  createMap('text', 'text', (v) => {
    const keys = Object.keys(v)

    return {
      stringfied: JSON.stringify(v),
      formatted: (
        <Set orientation="vertical">
          {keys.map((key, index) => (
            <Text key={index}>{`${key}: ${v[key]}`}</Text>
          ))}
        </Set>
      ),
    }
  })
)

console.log({
  text,
})

export const tokens = [
  ...background,
  ...foreground,
  ...border,
  ...shadow,
  ...text,
]
