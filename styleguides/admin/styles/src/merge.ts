import lodashMerge from 'lodash.merge'

/**
 * merges n objects into one
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const merge = (...params: any) => lodashMerge({}, ...params)
