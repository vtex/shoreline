import React from 'react'
import { createComponent, useElement, tag } from '@vtex/admin-ui-react'
import { Combobox, ComboboxCancel } from 'ariakit/combobox'
import { IconXCircle } from '@vtex/phosphor-icons'

import type { ComboboxState } from './combobox.state'
import { FieldContainer, FloatingLabel } from '../components/Field'
import { Button } from '../components/Button'
import * as style from './combobox.style'

export const ComboboxField = createComponent<'div', ComboboxFieldProps>(
  (props) => {
    const { state, label, id, ...htmlProps } = props

    return useElement('div', {
      ...htmlProps,
      children: (
        <FieldContainer csx={style.container}>
          <tag.input
            placeholder=" "
            as={Combobox}
            csx={style.input}
            id={id}
            state={state}
          />
          <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
          <tag.div csx={style.buttonContainer}>
            <Button
              variant="adaptative-dark"
              as={ComboboxCancel as any}
              state={state}
              icon={<IconXCircle />}
              size="small"
              csx={style.clearButton}
            />
          </tag.div>
        </FieldContainer>
      ),
    })
  }
)

interface ComboboxFieldProps {
  id: string
  state: ComboboxState
  label: string
}
