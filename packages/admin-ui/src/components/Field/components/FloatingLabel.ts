import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

/**
 * Form label component with a floating style.
 * @example
 * <FieldContainer>
 *  <FloatingLabel>label</FloatingLabel>
 *  <Input />
 * </FieldContainer>
 */
export const FloatingLabel = createComponent<'label'>((props) => {
  return useElement('label', {
    baseStyle: {
      text: '$body',
      left: 12,
      paddingTop: 2,
      color: '$secondary',
      marginBottom: 3,
      position: 'absolute',
      transform: 'translate(0, 16px) scale(1)',
      transformOrigin: 'top left',
      transition: 'all 0.2s ease-out;',
    },
    ...props,
  })
})

export type FloatingLabelProps = ComponentPropsWithRef<typeof FloatingLabel>
