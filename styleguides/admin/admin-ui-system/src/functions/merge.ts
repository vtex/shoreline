import lodashMerge from 'lodash.merge'

export const merge = (...params: any) => lodashMerge({}, ...params)
