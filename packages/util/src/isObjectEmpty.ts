/**
 * Whether an Record<string, unknown> is empty
 */
export const isObjectEmpty = (obj: Record<string, unknown>) =>
  Object.keys(obj).length === 0 && obj.constructor === Object
