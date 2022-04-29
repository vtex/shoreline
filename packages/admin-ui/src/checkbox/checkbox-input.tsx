import { useEffect, useRef } from 'react'
import { Checkbox as AriakitCheckbox } from 'ariakit/Checkbox'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { useForkRef } from '@vtex/admin-ui-hooks'

import * as style from './checkbox.style'

export const CheckboxInput = createComponent<
  typeof AriakitCheckbox,
  CheckboxInputOptions
>((props) => {
  const { error = false, ref: htmlRef, state, ...htmlProps } = props

  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current && state) {
      ref.current.indeterminate = state.value === 'indeterminate'
    }
  }, [state])

  return useElement(AriakitCheckbox, {
    ...htmlProps,
    ref: useForkRef(ref, htmlRef),
    state,
    baseStyle: {
      ...style.checkboxStyle,
      ...(error ? style.error : {}),
    },
  })
})

export interface CheckboxInputOptions {
  error?: boolean
  id?: string
  ref?: React.Ref<HTMLInputElement>
}

export type CheckboxInputProps = React.ComponentPropsWithRef<
  typeof CheckboxInput
>
