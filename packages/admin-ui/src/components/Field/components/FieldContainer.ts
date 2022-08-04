import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

const rules = {
  focus: 'focus + label',
  placeholder: 'placeholder-shown:not(:focus) + label',
  placeholderShown: 'not(:placeholder-shown) + label',
}

/**
 * Field container for FloatingLabel
 * @example
 * <FieldContainer>
 *  <FloatingLabel>label</FloatingLabel>
 *  <Input />
 * </FieldContainer>
 */
export const FieldContainer = createComponent<'div'>((props) => {
  return useElement('div', {
    baseStyle: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      [`input:${rules.focus}, textarea:${rules.focus}`]: {
        transform: 'translate(1px, 4px) scale(0.875)',
      },
      [`input:${rules.placeholder}, textarea:${rules.placeholder}`]: {
        paddingTop: '$1',
      },
      [`input:${rules.placeholderShown}, textarea:${rules.placeholderShown}`]: {
        transform: 'translate(1px, 4px) scale(0.875)',
      },
    },
    ...props,
  })
})

export type FieldContainerProps = ComponentPropsWithRef<typeof FieldContainer>
