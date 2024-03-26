export interface AdminContext {
  /**
   * The account in which the app is running
   */
  account: string
  /**
   * The workspace in which the app is running
   */
  workspace: string
  /**
   * The locale of the current user. This information
   * comes from the render runtime
   */
  locale?: string
  /**
   * The currency of the current user. This information
   * comes from the render runtime
   */
  currency?: string
  /**
   * VTEX ID token from the user
   */
  token: string
  /**
   * The production URL of the app
   */
  prodUrl: string
  /**
   * The development URL of the app
   */
  devUrl?: string
  /**
   * Whether the app is running in production mode
   */
  production: boolean
  /**
   * The base path of the application relative to the admin
   * It is the app's path that appears on the admin sidebar
   * @example
   * /admin/rocket
   */
  basePath: string
  /**
   * The top window href of the admin
   * @example
   * https://teamadmin.myvtex.com/admin/rocket
   */
  topWindowHref: string
  /**
   * The current path relative to the admin
   * @example
   * /admin/rocket/nextjs-internal-route
   */
  path?: string
}

export interface AdminIframeEvent {
  type: 'admin-iframe-message'
  data: AdminContext
}
