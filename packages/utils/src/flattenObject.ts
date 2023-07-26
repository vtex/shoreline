type GenericObject = Record<string, any>

export function flattenObject<T extends GenericObject>(
  object: T,
  joinString = '-',
  defaultString = '*'
): GenericObject {
  const result: GenericObject = {}

  for (const i in object) {
    if (typeof object[i] === 'object' && !Array.isArray(object[i])) {
      const temp = flattenObject(object[i])

      for (const j in temp) {
        if (j === defaultString) {
          result[`${i}`] = temp[j]
        } else {
          result[`${i}${joinString}${j}`] = temp[j]
        }
      }
    } else {
      result[i] = object[i]
    }
  }

  return result
}
