import { get } from '@vtex/admin-ui-util'

const breakpoints = {
  mobile: '40em',
  tablet: '48em',
  desktop: '64em',
  widescreen: '75em',
}

export function convertChainedSelectors(key: string) {
  const joinedSelectors = ['[', ':']
  const spacedSelectors = ['.', '+']

  const isJoined = joinedSelectors.find((selector) => key.startsWith(selector))
  const isSpaced = spacedSelectors.find((selector) => key.startsWith(selector))

  const joinedSelector = isJoined && `&${key}`
  const spacedSelector = isSpaced && `& ${key}`

  const converted = joinedSelector ?? spacedSelector ?? key

  return converted
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
