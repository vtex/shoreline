import { defaultMixins } from './default-values'
import type { MixinDictionary, Mixin } from './types'

/**
 * Find mixin for css property
 * @param {String} prop Prop to look for
 * @param {Object} dictionary { [prop]: mixin } Dict
 * @returns {String | undefined} Mixin
 */
export function findMixin(
  prop: string,
  dictionary: MixinDictionary = defaultMixins
): Mixin | undefined {
  return dictionary[prop]
}
