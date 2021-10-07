import React, { Fragment, createContext, useContext, useCallback } from 'react'

export type Locale =
  | 'pt-BR'
  | 'en-US'
  | 'es-AR'
  | 'fr-FR'
  | 'ja-JP'
  | 'ko-KR'
  | 'it-IT'
  | 'nl-NL'
  | 'ro-RO'

const englishTranslation = {
  comboboxLabel: 'Search',
  placeholder: 'Search',
  adminPages: 'Admin Pages',
  lastSearches: 'Last Searches',
  toNavigate: 'to navigate',
  toSelect: 'to select',
  toCancel: 'to cancel',
  emptyTitle: 'No result matches your search criteria',
  emptySubtitle: 'Please, search for a different term',
}

const ids: Record<Locale, SearchBoxIntlStrings> = {
  'pt-BR': {
    comboboxLabel: 'Buscar',
    placeholder: 'Buscar',
    adminPages: 'Páginas do Admin',
    lastSearches: 'Últimas buscas',
    toNavigate: 'para navegar',
    toSelect: 'para selecionar',
    toCancel: 'para cancelar',
    emptyTitle: 'Nenhum resultado encontrado para o termo buscado',
    emptySubtitle: 'Por favor, procure por um termo diferente',
  },
  'en-US': englishTranslation,
  'es-AR': englishTranslation,
  'fr-FR': englishTranslation,
  'ja-JP': englishTranslation,
  'ko-KR': englishTranslation,
  'it-IT': englishTranslation,
  'nl-NL': englishTranslation,
  'ro-RO': englishTranslation,
}

const LocaleContext = createContext<Locale>('en-US')

const DEFAULT_LOCALE: Locale = 'en-US'

function useDefaultLocale() {
  const intl = useCallback((id: IntlIds) => {
    return ids[DEFAULT_LOCALE][id]
  }, [])

  return { intl, locale: DEFAULT_LOCALE }
}

export function useLocale() {
  const locale = useContext(LocaleContext)

  if (!locale) {
    console.warn(
      '🌎  No locale provided. Falling back to default locale (en-US).'
    )

    return useDefaultLocale()
  }

  const intl = useCallback(
    (id: IntlIds) => {
      return ids[locale]?.[id]
    },
    [locale]
  )

  return { intl, locale }
}

const { Provider: LocaleProvider } = LocaleContext

export { LocaleProvider }

type SearchBoxIntlStrings = typeof englishTranslation

type IntlIds = keyof typeof englishTranslation

interface IntlProps {
  id: IntlIds
}

/**
 * Typesafe i18n component
 * @example
 * <Intl key=“placeholder” >
 */
export function Intl(props: IntlProps) {
  const { id } = props
  const { intl } = useLocale()
  const content = intl(id)

  return <Fragment>{content}</Fragment>
}
