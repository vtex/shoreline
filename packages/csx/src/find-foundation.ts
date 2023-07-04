import type { Foundation, FoundationDictionary } from './types'
import { defaultFoundations } from './default-values'

/**
 * Find foundation for css property
 * @param {String} prop Prop to look for
 * @param {Object} dictionary { [prop]: foundation } Dict
 * @returns {String | undefined} Foundation
 */
export function findFoundation(
  prop: string,
  dictionary: FoundationDictionary = defaultFoundations
): Foundation | undefined {
  return dictionary[prop]
}
