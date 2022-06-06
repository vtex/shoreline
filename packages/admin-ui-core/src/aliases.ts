import { get } from '@vtex/admin-ui-util'

const breakpoints = {
  mobile: '40em',
  tablet: '48em',
  desktop: '64em',
  widescreen: '75em',
}

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

  // responsive
  '@tablet': `@media (min-width: ${breakpoints.tablet})`,
  '@tabletOnly': `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  '@desktop': `@media (min-width: ${breakpoints.desktop})`,
  '@desktopOnly': `@media (min-width: ${breakpoints.desktop}) and (max-width: ${breakpoints.widescreen})`,
  '@widescreen': `@media (min-width: ${breakpoints.widescreen})`,
}

export function alias(prop: string) {
  const converted = convertChainedSelectors(prop)

  return get(aliases, converted, converted)
}
