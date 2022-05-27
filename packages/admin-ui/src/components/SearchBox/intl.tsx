import React, { Fragment, createContext, useContext, useCallback } from 'react'

const locales = [
  'pt-BR',
  'en-US',
  'es-AR',
  'fr-FR',
  'ja-JP',
  'ko-KR',
  'it-IT',
  'nl-NL',
  'ro-RO',
  'bg-BG',
  'th-TH',
] as const

export type Locale = typeof locales[number]

const englishTranslation = {
  comboboxLabel: 'Search',
  placeholder: 'Search',
  adminPages: 'Admin pages',
  lastSearches: 'Last searchess',
  toNavigate: 'to navigate',
  toSelect: 'to select',
  toCancel: 'to cancel',
  emptyTitle: 'No results match your search criteria',
  emptySubtitle: 'Please, search for a different term',
}

const ids: Record<Locale, SearchBoxIntlStrings> = {
  'pt-BR': {
    comboboxLabel: 'Buscar',
    placeholder: 'Buscar',
    adminPages: 'Páginas do admin',
    lastSearches: 'Últimas buscas',
    toNavigate: 'para navegar',
    toSelect: 'para selecionar',
    toCancel: 'para cancelar',
    emptyTitle: 'Nenhum resultado corresponde aos seus critérios de busca',
    emptySubtitle: 'Busque por outro termo',
  },
  'en-US': {
    comboboxLabel: 'Search',
    placeholder: 'Search',
    adminPages: 'Admin pages',
    lastSearches: 'Last searches',
    toNavigate: 'to navigate',
    toSelect: 'to select',
    toCancel: 'to cancel',
    emptyTitle: 'No results match your search criteria',
    emptySubtitle: 'Please, search for a different term',
  },
  'es-AR': {
    comboboxLabel: 'Buscar',
    placeholder: 'Buscar',
    adminPages: 'Páginas del admin',
    lastSearches: 'Últimas búsquedas',
    toNavigate: 'para navegar',
    toSelect: 'para seleccionar',
    toCancel: 'para cancelar',
    emptyTitle: 'Ningún resultado coincide con tus criterios de búsqueda',
    emptySubtitle: 'Por favor, ingresa otro término',
  },
  'fr-FR': {
    comboboxLabel: 'Recherche',
    placeholder: 'Recherche',
    adminPages: `Pages d'administration`,
    lastSearches: 'Dernières recherches',
    toNavigate: 'Pour naviguer',
    toSelect: 'Pour sélectionner',
    toCancel: 'Pour annuler',
    emptyTitle: 'Aucun résultat ne correspond à vos critères de recherche',
    emptySubtitle: 'Veuillez rechercher un autre terme',
  },
  'ja-JP': {
    comboboxLabel: '検索',
    placeholder: '検索',
    adminPages: '管理ページ',
    lastSearches: '直近の検索',
    toNavigate: 'ナビゲーション用',
    toSelect: '選択用',
    toCancel: 'キャンセル用',
    emptyTitle: '検索基準に一致する結果はありません',
    emptySubtitle: '別の語句で検索してください',
  },
  'ko-KR': {
    comboboxLabel: '검색',
    placeholder: '검색',
    adminPages: '관리 페이지',
    lastSearches: '마지막 검색',
    toNavigate: '탐색',
    toSelect: '선택',
    toCancel: '취소',
    emptyTitle: '검색 조건과 일치하는 결과가 없습니다',
    emptySubtitle: '다른 용어를 검색하세요',
  },
  'it-IT': {
    comboboxLabel: 'Cerca',
    placeholder: 'Cerca',
    adminPages: `Pagine dell'Admin`,
    lastSearches: 'Ultime ricerche',
    toNavigate: 'per navigare',
    toSelect: 'per selezionare',
    toCancel: 'per annullare',
    emptyTitle: 'Nessun risultato corrisponde ai tuoi criteri di ricerca',
    emptySubtitle: 'Si prega di provare con un altro termine',
  },
  'nl-NL': {
    comboboxLabel: 'Zoeken',
    placeholder: 'Zoeken',
    adminPages: `Beheerderspagina's`,
    lastSearches: 'Laatste zoekopdrachten',
    toNavigate: 'om te navigeren',
    toSelect: 'om te kiezen',
    toCancel: 'om te annuleren',
    emptyTitle: 'Geen resultaten die aan uw zoekcriteria voldoen',
    emptySubtitle: 'Zoek naar een andere term',
  },
  'ro-RO': {
    comboboxLabel: 'Caută',
    placeholder: 'Caută',
    adminPages: 'Pagini de administrare',
    lastSearches: 'Ultimele căutări',
    toNavigate: 'pentru a naviga',
    toSelect: 'pentru a selecta',
    toCancel: 'pentru a anula',
    emptyTitle: 'Niciun rezultat nu corespunde criteriilor tale de căutare',
    emptySubtitle: 'Te rugăm să cauți un alt termen',
  },
  'bg-BG': {
    comboboxLabel: 'Търсене',
    placeholder: 'Търсене',
    adminPages: 'Администраторски страници',
    lastSearches: 'Последни търсения',
    toNavigate: 'за навигиране',
    toSelect: 'за избиране',
    toCancel: 'за отказ',
    emptyTitle: 'Няма резултати за вашите критерии за търсене',
    emptySubtitle: 'Моля, потърсете друг термин',
  },
  'th-TH': {
    comboboxLabel: 'ค้นหา',
    placeholder: 'ค้นหา',
    adminPages: 'หน้าเพจ Admin',
    lastSearches: 'การค้นหาล่าสุด',
    toNavigate: 'เพื่อนำทาง',
    toSelect: 'เพื่อเลือก',
    toCancel: 'เพื่อยกเลิก',
    emptyTitle: 'ไม่มีผลลัพธ์ตรงตามเกณฑ์การค้นหาของคุณ',
    emptySubtitle: 'โปรดค้นหาโดยใช้คำอื่น',
  },
}

const LocaleContext = createContext<Locale>('en-US')

const DEFAULT_LOCALE: Locale = 'en-US'

function useDefaultLocale() {
  const intl = useCallback(
    (id: IntlIds) => {
      return ids[DEFAULT_LOCALE][id]
    },
    [DEFAULT_LOCALE]
  )

  return { intl, locale: DEFAULT_LOCALE }
}

export function useLocale() {
  const locale = useContext(LocaleContext)

  if (!locale || !locales.includes(locale)) {
    console.warn(
      '🌎  No locale provided, or unexistent locale set. Falling back to default locale (en-US).'
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
