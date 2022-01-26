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
import { replaceHslForHex, RGBAToHexA } from '../utils'

const colorFormatter = (color: string) => {
  const isHsla = /.*hsl|hsla.*/gi.test(color)
  const isRgba = /.*rgba.*/gi.test(color)

  return {
    stringfied: JSON.stringify(color),
    formatted: (
      <Set orientation="vertical">
        <Text>{isHsla && replaceHslForHex(color)}</Text>
        <Text>{isRgba && RGBAToHexA(color)}</Text>
        <Text>{color}</Text>
      </Set>
    ),
  }
}

const cssWithColorFormatter = (text: string) => {
  return replaceHslForHex(text, { keepBothValues: true })
}

function createMap(
  prop: string,
  tokenCall: string,
  fotmatValue = (v: any) => v
) {
  return function map(token: string) {
    const formatedToken = `${tokenCall}.${extractTokenCall(token)}`

    return {
      token: `$${extractTokenCall(token)}`,
      description: '',
      value: fotmatValue(get(defaultTheme, formatedToken, '-')),
      type: prop,
      csx: {
        [`${prop}`]: token,
      },
    }
  }
}

export const background = bgTokens.map(
  createMap('background', 'bg', colorFormatter)
)
export const foreground = fgTokens.map(createMap('color', 'fg', colorFormatter))
export const border = borderTokens.map(
  createMap('border', 'border', cssWithColorFormatter)
)
export const shadow = shadowTokens.map(
  createMap('boxShadow', 'shadow', cssWithColorFormatter)
)

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
