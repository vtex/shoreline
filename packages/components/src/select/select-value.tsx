import React from 'react'
import { useSelectContext } from './select-provider'
import { isEmpty } from './select-utils'

/**
 * Renders the value of the select
 * @status stable
 */
export function SelectValue(props: SelectValueProps) {
  const { placeholder } = props
  const ctx = useSelectContext()

  if (!ctx) {
    throw Error('use SelectValue within a SelectProvider or Select')
  }

  const value = ctx.useState('value')

  if (isEmpty(value)) {
    return <div data-sl-select-placeholder>{placeholder}</div>
  }

  return <div data-sl-select-value>{value}</div>
}

export interface SelectValueOptions {
  /**
   * placeholder of the select
   */
  placeholder?: string
}

export type SelectValueProps = SelectValueOptions
