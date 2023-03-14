import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'

import { messages } from './select.i18n'
import { useMessageFormatter } from '../i18n'
import { selectTheme } from './select.css'

export const SelectInput = forwardRef(function SelectInput(
  props: SelectInputProps,
  ref: Ref<HTMLSelectElement>
) {
  const { error = false, value, children, className = '', ...htmlProps } = props
  const formatMessage = useMessageFormatter(messages.select)

  return (
    <select
      ref={ref}
      defaultValue=""
      value={value}
      data-error={error}
      data-selected={!!value}
      className={cx(selectTheme, className)}
      {...htmlProps}
    >
      <option value="" disabled>
        {formatMessage('placeholder')}&hellip;
      </option>
      {children}
    </select>
  )
})

export type SelectInputProps = ComponentPropsWithoutRef<'select'> & {
  error?: boolean
}
