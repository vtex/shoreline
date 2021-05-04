/* eslint-disable @typescript-eslint/no-explicit-any */
import pick from 'lodash.pick'
import omit from 'lodash.omit'

export { pick, omit }

/**
 * Whether an Record<string, unknown> is empty
 */
export const isObjectEmpty = (obj: Record<string, unknown>) =>
  Object.keys(obj).length === 0 && obj.constructor === Object
