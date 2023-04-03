import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { IconContainer } from '@vtex/admin-ui-react'
import { Combobox, ComboboxCancel } from 'ariakit/combobox'
import { IconXCircle } from '@vtex/phosphor-icons'

import type { ComboboxState } from './combobox.state'
import {
  buttonContainerTheme,
  clearButtonTheme,
  fieldContainerTheme,
  fieldLabelTheme,
  inputTheme,
} from './combobox.css'

const fixUp: any = {
  // Ariakit is trowing an error here for some reason
  // We shaw remove this after the fix
  placeholder: ' ',
}

export const ComboboxField = forwardRef(
  (props: ComboboxFieldProps, ref: Ref<HTMLDivElement>) => {
    const { state, label, id, ...htmlProps } = props

    return (
      <div {...htmlProps} ref={ref}>
        <div className={fieldContainerTheme}>
          <Combobox {...fixUp} className={inputTheme} id={id} state={state} />
          <label htmlFor={id} className={fieldLabelTheme}>
            {label}
          </label>
          {state.value !== '' && (
            <div className={buttonContainerTheme}>
              <ComboboxCancel state={state} className={clearButtonTheme}>
                <IconContainer>
                  <IconXCircle />
                </IconContainer>
              </ComboboxCancel>
            </div>
          )}
        </div>
      </div>
    )
  }
)

interface ComboboxFieldProps extends ComponentPropsWithoutRef<'div'> {
  id: string
  state: ComboboxState<any>
  label: string
}
