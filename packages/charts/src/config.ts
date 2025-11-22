import { defaultColorShade } from './theme/colors'
import * as echarts from 'echarts'

/**
 * Adds a hover color mapping to the setted color in the legend colors component.
 * It doesn't allow to overwrite a mapping.
 *
 * @param {string} color - The base color key to which the hover state will be mapped.
 * @param {string} hover - The color value to be used when hovering over elements with the base color.
//  * @example addHoverToColors('var(--sl-color-red-5)', 'var(--sl-color-red-6)');
 */
export function addHoverToLegendColor(color: string, hover: string) {
  if (Object.keys(defaultColorShade).includes(color)) return
  defaultColorShade[color] = hover
}

/**
 *
 * @param name Name you're giving to the locale, such as "_PT-br"_ or _"FR"_.
 *  This is what you will pass to the `locale`  prop in `<Chart>`
 * @param locale The actual locale object, see [docs](https://github.com/apache/echarts/blob/release/src/i18n/langEN.ts)
 *  for details on the format.
 */
export function registerLocale(name: string, locale: any): void {
  echarts.registerLocale(name, locale)
}
