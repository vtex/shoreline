type PossibleDataAttrValues = string | boolean
type ObjectNotation = Record<string, PossibleDataAttrValues>

export function dataAttr(
  property: string | ObjectNotation,
  value?: PossibleDataAttrValues
) {
  if (typeof property === 'string') {
    return `[data-${property}="${String(value ?? '')}"]`
  }

  const attrs = Object.keys(property).reduce((acc, element) => {
    return `${acc}[data-${element}="${String(property[element])}"]`
  }, '')

  return attrs
}
