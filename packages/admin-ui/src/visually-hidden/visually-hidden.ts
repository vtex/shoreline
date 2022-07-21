import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'
import { VisuallyHidden as AriakitVisuallyHidden } from 'ariakit'

export const VisuallyHidden = createComponent<typeof AriakitVisuallyHidden>(
  (props) => {
    return useElement(AriakitVisuallyHidden, props)
  }
)

export type VisuallyHiddenProps = ComponentPropsWithRef<typeof VisuallyHidden>
