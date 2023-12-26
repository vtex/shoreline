import type { ReactNode } from 'react'
import React from 'react'
import { I18nProvider } from '@react-aria/i18n'
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
    <LocaleContext.Provider value={locale}>
      {/** Some react-aria components require this to translate */}
      <I18nProvider locale={locale}>{children}</I18nProvider>
    </LocaleContext.Provider>
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
