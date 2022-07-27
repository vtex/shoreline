import { get } from '@vtex/admin-ui-util'
import { breakpoints } from './tokens/breakpoints'

const { tablet, desktop, widescreen } = breakpoints

export function convertChainedSelectors(key: string) {
  const selector = '&'
  const space = ' '

  const selectorKey = key.charAt(0)

  const converted = {
    '[': `${selector}${key}`,
    ':': `${selector}${key}`,
    '.': `${selector}${space}${key}`,
    '+': `${selector}${space}${key}`,
  }[selectorKey]

  return converted ?? key
}

export const aliases = {
  // color
  bg: 'background',
  fg: 'color',

  // responsive
  '@tablet': `@media (min-width: ${tablet})`,
  '@tabletOnly': `@media (min-width: ${tablet}) and (max-width: ${desktop})`,
  '@desktop': `@media (min-width: ${desktop})`,
  '@desktopOnly': `@media (min-width: ${desktop}) and (max-width: ${widescreen})`,
  '@widescreen': `@media (min-width: ${widescreen})`,
}

export function alias(prop: string) {
  const converted = convertChainedSelectors(prop)

  return get(aliases, converted, converted)
}
