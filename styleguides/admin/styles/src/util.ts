import lodashMerge from 'lodash.merge'
import lodashGet from 'lodash.get'

/**
 * merges n objects into one
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const merge = (...params: any) => lodashMerge({}, ...params)

export { lodashGet as get }
