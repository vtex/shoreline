import React, { Fragment } from 'react'

const ids = {
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

type IntlIds = keyof typeof ids

interface IntlProps {
  id: IntlIds
}

/**
 * Typesafe i18n function
 * @param id - string id to intl
 * @example
 * intl('placeholder')
 */
export function intl(id: IntlIds) {
  return ids[id]
}

/**
 * Typesafe i18n component
 * @example
 * <Intl key="placeholder" />
 */
export function Intl(props: IntlProps) {
  const { id } = props
  const content = intl(id)
  return <Fragment>{content}</Fragment>
}
