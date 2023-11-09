import type { ReactNode } from 'react'
import React from 'react'
import { LocaleContext } from './locale-context'

/**
 * Provides the locale
 * @example
 * <LocaleProvider locale="pt-BR">
 *  ...
 * </LocaleProvider>
 */
export function LocaleProvider(props: LocaleProviderProps) {
  const { locale = 'en-US', children } = props

  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  )
}

export interface LocaleProviderProps {
  /**
   * The BCP47 language code for the locale.
   * @link https://www.ietf.org/rfc/bcp/bcp47.txt
   */
  locale?: string
  children?: ReactNode
}
