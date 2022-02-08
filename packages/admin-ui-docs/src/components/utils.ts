import { hsl as getHexFromHsl, parseToHsl, parseToRgb } from 'polished'
import type { RgbaColor } from 'polished/lib/types/color'

export function hslaToHex(hsla: string) {
  const hslObject = parseToHsl(hsla)

  return getHexFromHsl(hslObject).toUpperCase()
}

export function rgbaToHexA(rgba: string) {
  const { red, green, blue, alpha = 1 } = parseToRgb(rgba) as RgbaColor

  let rHex = red.toString(16)
  let gHex = green.toString(16)
  let bHex = blue.toString(16)
  let aHex = Math.round(alpha * 255).toString(16)

  if (rHex.length === 1) rHex = `0${rHex}`
  if (gHex.length === 1) gHex = `0${gHex}`
  if (bHex.length === 1) bHex = `0${bHex}`
  if (aHex.length === 1) aHex = `0${aHex}`

  return `#${rHex}${gHex}${bHex}${alpha !== 1 ? aHex : ''}`.toUpperCase()
}

export function replaceHslForHex(
  original: string,
  props?: { keepBothValues: boolean }
) {
  const { keepBothValues } = props || { keepBothValues: false }
  const hslaRegex = /(hsl)a?\([^)]*\)/gi

  const newString = original.replace(hslaRegex, (match) => {
    return keepBothValues ? `${match} ${hslaToHex(match)}` : hslaToHex(match)
  })

  return newString
}
