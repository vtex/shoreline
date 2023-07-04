import { get } from '@vtex/admin-ui-util'
import { defaultMixins } from './default-values'

export function isMixin(prop: string): boolean {
  return prop in defaultMixins
}

export function getMixin(prop: string): any {
  return get(defaultMixins, `${prop}`, {})
}
