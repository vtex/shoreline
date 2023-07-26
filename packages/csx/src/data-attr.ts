type PossibleDataAttrValues = string | boolean
type ObjectNotation = Record<string, PossibleDataAttrValues>

/**
 * Helper for writing css data atrributes
 * @link https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
 * @param {String | Object} property Propperty of the data-attribute
 * @param value Value of the data-attribute
 * @returns {String} [data-[property]=[value]]
 * @example
 * // Single values
 * csx({
 *  [dataAttr('prop', 'value')]: {
 *    // ...
 *  }
 * })
 *
 * // Multiple values
 * csx({
 *  [dataAttr({ prop1: 'value1', prop2: 'value2' })]: {
 *    // ...
 *  }
 * })
 */
export function dataAttr(
  property: string | ObjectNotation,
  value?: PossibleDataAttrValues
): string {
  if (typeof property === 'string') {
    if (typeof value !== 'boolean' && !value) {
      return `[data-${property}]`
    }

    return `[data-${property}="${String(value)}"]`
  }

  const attrs = Object.keys(property).reduce((acc, element) => {
    return `${acc}[data-${element}="${String(property[element])}"]`
  }, '')

  return attrs
}
