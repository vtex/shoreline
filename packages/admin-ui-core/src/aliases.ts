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

  // flex
  justify: 'justifyContent',
  direction: 'flexDirection',
  align: 'alignItems',
  grow: 'flexGrow',
  shrink: 'flexShrink',
  basis: 'flexBasis',
  wrap: 'flexWrap',

  // responsive
  '@tablet': `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  '@desktop': `@media (min-width: ${breakpoints.desktop}) and (max-width: ${breakpoints.widescreen})`,
  '@widescreen': `@media (min-width: ${breakpoints.widescreen})`,

  // space
  m: 'margin',
  mx: 'marginX',
  my: 'marginY',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  p: 'padding',
  px: 'paddingX',
  py: 'paddingY',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
}

export function alias(prop: string) {
  return get(aliases, prop, prop)
}
