import { jsx } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'

/**
 * Form label component with a floating style.
 * @example
 * <FieldContainer>
 *  <FloatingLabel>label</FloatingLabel>
 *  <Input />
 * </FieldContainer>
 */
export const FloatingLabel = jsx('label')({
  text: 'body',
  fontSize: 1,
  left: 12,
  paddingTop: 2,
  color: 'muted',
  marginBottom: 3,
  position: 'absolute',
  transform: 'translate(0, 16px) scale(1)',
  transformOrigin: 'top left',
  transition: 'all 0.2s ease-out;',
})

export type FloatingLabelProps = ComponentPropsWithRef<typeof FloatingLabel>
