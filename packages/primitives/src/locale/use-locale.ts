import { useContext } from 'react'
import { LocaleContext } from './locale-context'

/**
 * Gets value of the locale from Context
 * @example
 * const locale = useLocale()
 */
export function useLocale() {
  const locale = useContext(LocaleContext)

  return locale
}
