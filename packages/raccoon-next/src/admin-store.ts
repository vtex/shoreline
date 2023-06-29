import type { AdminContext } from './types'
import { createStore } from './utils/store'

/**
 * internal store
 */
export const adminStore = createStore<AdminContext>()
