export interface AdminContext {
  account: string
  workspace: string
  locale?: string
  currency?: string
  token: string
  prodUrl: string
  devUrl?: string
  production: boolean
  basePath: string
  topWindowHref: string
}

export interface AdminIframeEvent {
  type: 'admin-iframe-message'
  data: AdminContext
}
