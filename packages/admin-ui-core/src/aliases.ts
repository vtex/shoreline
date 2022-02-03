import { get } from '@vtex/admin-ui-util'

const breakpoints = {
  mobile: '40em',
  tablet: '48em',
  desktop: '64em',
  widescreen: '75em',
}

export const aliases = {
  // color
  bg: 'background',

  // responsive
  '@tablet': `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  '@desktop': `@media (min-width: ${breakpoints.desktop}) and (max-width: ${breakpoints.widescreen})`,
  '@widescreen': `@media (min-width: ${breakpoints.widescreen})`,
}

export function alias(prop: string) {
  return get(aliases, prop, prop)
}
