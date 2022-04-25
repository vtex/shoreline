import React from 'react'
import {
  createComponent,
  useElement,
  tag,
  useSystem,
} from '@vtex/admin-ui-react'
import { Combobox, ComboboxCancel } from 'ariakit/combobox'
import { IconXCircle } from '@vtex/phosphor-icons'

// import type { ComboboxState } from './combobox.state'
import { FieldContainer } from '../components/Field'
import { Button } from '../button'
import type { ComboboxState } from '../combobox'

const fixUp: any = {
  // Ariakit is trowing an error here for some reason
  // We shaw remove this after the fix
  placeholder: ' ',
}

const style = {
  buttonContainer: {
    right: 0,
    top: 1,
    height: '40px',
    paddingRight: '$3',
    position: 'absolute',
    display: 'flex',
    color: '$primary',
  },
  container: {
    width: '216px',
    marginX: 'auto',
  },
  input: {
    width: '216px',
    height: '40px',
    paddingX: '$3',
    text: '$body',
    bg: '$form.neutral',
    border: '$form.neutral',
    borderRadius: '$default',
    color: '$form.neutral',
    outline: 0,
    transition: 'snap',
    ':hover': {
      border: '$form.neutralHover',
    },
    ':focus': {
      border: '$form.neutralFocus',
      boxShadow: '$ring.neutral',
    },
    ':disabled': {
      bg: '$disabled',
      color: '$disabled',
    },
  },
  clearButton: {
    marginRight: '$1',
    color: '$secondary',
  },
} as any

export const FilterSeachbox = createComponent<'div', ComboboxFieldProps>(
  (props) => {
    const { state, id, ...htmlProps } = props
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
            placeholder="Search"
          />
          {state.value !== '' && (
            <tag.div csx={style.buttonContainer}>
              <Button
                variant="neutralTertiary"
                as={ComboboxCancel as any}
                state={state}
                icon={<IconXCircle />}
                csx={style.clearButton}
              />
            </tag.div>
          )}
        </FieldContainer>
      ),
    })
  }
)

interface ComboboxFieldProps {
  id: string
  state: ComboboxState<any>
}
