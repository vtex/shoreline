import cssesc from 'cssesc'
import type { TokenConfig } from './types'

/**
 * Retunrs the CSS string for a given token config
 */
export function getCssString(config: TokenConfig) {
  let str = ':where(:root) {'

  for (const category of Object.keys(config)) {
    const { tokens } = config[category]
    for (const token of tokens) {
      const { name, value } = token
      str += cssesc(`--sl-${name}: ${value};`)
    }
  }

  str += '}'

  return str
}
