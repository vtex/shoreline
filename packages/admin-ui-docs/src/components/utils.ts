function getSeparateHSLAValues(hsla: string) {
  const values = hsla.replace(/hsla|hsl|\(|\)|%/g, '').split(',')

  return {
    h: Number(values[0]),
    s: Number(values[1]),
    l: Number(values[2]),
    a: Number(values[3]),
  }
}

function getSeparateRGBAValues(rgba: string) {
  const values = rgba.replace(/rgba|rgb|\(|\)/g, '').split(',')

  return {
    r: Number(values[0]),
    g: Number(values[1]),
    b: Number(values[2]),
    a: Number(values[3]),
  }
}

export function HSLAToHexA(hsla: string) {
  let { h, s, l, a } = getSeparateHSLAValues(hsla)

  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  let r = 0
  let g = 0
  let b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  // Having obtained RGB, convert channels to hex
  let rHex = Math.round((r + m) * 255).toString(16)
  let gHex = Math.round((g + m) * 255).toString(16)
  let bHex = Math.round((b + m) * 255).toString(16)
  let aHex = Math.round(a * 255).toString(16)

  // Prepend 0s, if necessary
  if (rHex.length === 1) rHex = `0${r}`
  if (gHex.length === 1) gHex = `0${g}`
  if (bHex.length === 1) bHex = `0${b}`
  if (aHex.length === 1) aHex = `0${aHex}`

  return `#${rHex}${gHex}${bHex}${a !== 1 ? aHex : ''}`.toUpperCase()
}

export function RGBAToHexA(rgba: string) {
  const { r, g, b, a } = getSeparateRGBAValues(rgba)

  let rHex = r.toString(16)
  let gHex = g.toString(16)
  let bHex = b.toString(16)
  let aHex = Math.round(a * 255).toString(16)

  if (rHex.length === 1) rHex = `0${rHex}`
  if (gHex.length === 1) gHex = `0${gHex}`
  if (bHex.length === 1) bHex = `0${bHex}`
  if (aHex.length === 1) aHex = `0${aHex}`

  return `#${rHex}${gHex}${bHex}${a !== 1 ? aHex : ''}`.toUpperCase()
}

export function HexToHSLA(hex: string) {
  const r = Number(`0x${hex[1]}${hex[2]}`) / 255
  const g = Number(`0x${hex[3]}${hex[4]}`) / 255
  const b = Number(`0x${hex[5]}${hex[6]}`) / 255

  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin
  let h = 0
  let s = 0
  let l = 0

  if (delta === 0) h = 0
  else if (cmax === r) h = ((g - b) / delta) % 6
  else if (cmax === g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  if (h < 0) h += 360

  l = (cmax + cmin) / 2
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return `${h}, ${s}%, ${l}%, 1`
}

export function replaceHslForHex(
  original: string,
  props?: { keepBothValues: boolean }
) {
  const { keepBothValues } = props || { keepBothValues: false }
  const hslaRegex = /(hsl)a?\([^)]*\)/gi

  const newString = original.replace(hslaRegex, (match) => {
    return !keepBothValues ? HSLAToHexA(match) : `${match} ${HSLAToHexA(match)}`
  })

  return newString
}
