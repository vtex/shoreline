import get from 'lodash.get'
import omit from 'lodash.omit'
import pick from 'lodash.pick'
import lodashMerge from 'lodash.merge'

const merge = (...params: any) => lodashMerge({}, ...params)

export { get, omit, pick, merge }
