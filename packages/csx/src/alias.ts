import { defaultAliases } from './default-values'

/**
 * Convert an alias to a css property.
 * @param {String} prop Property to transform
 * @param {Object} aliases Map of { [alias]: prop }
 * @returns {String} Alias or Property
 */
export function alias(
  prop: string,
  aliases: Record<string, string> = defaultAliases
): string {
  if (prop in aliases) {
    return aliases[prop]
  }

  return prop
}
