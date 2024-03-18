import { useStore } from './utils/store'
import { adminStore } from './admin-store'

/**
 * This is the hook to access the admin context, which
 * contains the account, workspace, token, and other
 * information about the Admin environment, such as locale,
 * currency, and others.
 */
export function useAdmin() {
  return useStore(adminStore)
}
