import { defaultColorShade } from './theme/colors'

/**
 * Adds a hover color mapping to the setted color.
 * Its doesn't allow to overwrite a mapping
 *
 * @param {string} color - The base color key to which the hover state will be mapped.
 * @param {string} hover - The color value to be used when hovering over elements with the base color.
 * @example addHoverToColors('--sl-color-red-5', '--sl-color-red-6');
 */
export function addHoverToColors(color: string, hover: string) {
  if (Object.keys(defaultColorShade).includes(color)) return
  defaultColorShade[color] = hover
}
