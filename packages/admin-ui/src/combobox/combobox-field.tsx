import React from 'react'
import {
  createComponent,
  useElement,
  tag,
  useSystem,
} from '@vtex/admin-ui-react'
import { Combobox, ComboboxCancel } from 'ariakit/combobox'
import { IconXCircle } from '@vtex/phosphor-icons'

import type { ComboboxState } from './combobox.state'
import { FieldContainer, FloatingLabel } from '../components/Field'
import { Button } from '../components/Button'
import * as style from './combobox.style'

const fixUp: any = {
  // Ariakit is trowing an error here for some reason
  // We shaw remove this after the fix
  placeholder: ' ',
}

export const ComboboxField = createComponent<'div', ComboboxFieldProps>(
  (props) => {
    const { state, label, id, ...htmlProps } = props
    const { cn } = useSystem()

    return useElement('div', {
      ...htmlProps,
      children: (
        <FieldContainer csx={style.container}>
          <Combobox
            {...fixUp}
            className={cn(style.input)}
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
