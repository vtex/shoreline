import type { ChartTokens } from './chart-theme'

const remBase = 16

function parsePx(value: string) {
  const parsed = Number.parseFloat(value)

  return Number.isNaN(parsed) ? undefined : parsed
}

/**
 * Reads `--sl-*` tokens from an element's computed styles, so the values
 * reflect the full cascade at the chart's position in the document. Must only
 * be called in the browser (e.g. inside an effect).
 */
export function createElementTokens(element: HTMLElement): ChartTokens {
  const computed = getComputedStyle(element)
  const rootFontSize =
    parsePx(getComputedStyle(element.ownerDocument.documentElement).fontSize) ??
    remBase

  const get = (token: string) => {
    const value = computed.getPropertyValue(token).trim()

    return value === '' ? undefined : value
  }

  const px = (token: string) => {
    const value = get(token)

    if (!value) return undefined
    if (value.endsWith('rem')) {
      const parsed = parsePx(value)

      return parsed !== undefined ? parsed * rootFontSize : undefined
    }
    if (value.endsWith('px')) return parsePx(value)

    return undefined
  }

  return { get, px }
}
