import { get } from '@vtex/admin-ui-util'

const aliases = {
  // color
  bg: 'background',
  fg: 'color',

  // responsive
  '@tablet': `@media (min-width: var(--aui-bp-tablet))`,
  '@tabletOnly': `@media (min-width: var(--aui-bp-tablet)) and (max-width: var(--aui-bp-desktop))`,
  '@desktop': `@media (min-width: var(--aui-bp-desktop))`,
  '@desktopOnly': `@media (min-width: var(--aui-bp-desktop)) and (max-width: var(--aui-bp-widescreen))`,
  '@widescreen': `@media (min-width: var(--aui-bp-widescreen))`,
}

export function alias(prop: string) {
  const selectorOrProp = convertChainedSelectors(prop) ?? prop

  return get(aliases, selectorOrProp, selectorOrProp)
}

function convertChainedSelectors(key: string) {
  const selector = '&'
  const space = ' '

  const selectorKey = key.charAt(0)

  const converted = {
    '[': `${selector}${key}`,
    ':': `${selector}${key}`,
    '.': `${selector}${space}${key}`,
    '+': `${selector}${space}${key}`,
  }[selectorKey]

  return converted
}
