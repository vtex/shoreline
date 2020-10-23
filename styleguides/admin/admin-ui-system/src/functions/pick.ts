/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * pick with array
 */
export const pick = (obj: { [x: string]: any }, ...props: string[]) => {
  const object = {}

  props.forEach((prop) => {
    if (prop in obj) {
      ;(object as any)[prop] = obj[prop]
    }
  })

  return object
}
