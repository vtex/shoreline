import type {
  CheckboxProps as ReakitProps,
  CheckboxStateReturn,
} from 'reakit/Checkbox'
import { Checkbox as ReakitCheckbox, useCheckboxState } from 'reakit/Checkbox'
import { jsx } from '@vtex/admin-ui-react'

import * as style from './Checkbox.style'

export const Checkbox = jsx(ReakitCheckbox)(
  {
    ...style.baseline,
    ':checked': style.checked,
    ':indeterminate': style.indeterminate,
    variants: {
      size: {
        regular: style.regular,
        small: style.small,
      },
    },
  },
  {
    options: ['state'],
    useOptions: (options: CheckboxOptions, props) => {
      const { state } = options

      return { ...props, ...state }
    },
  }
)

Checkbox.defaultProps = {
  size: 'regular',
}

type State = Pick<ReakitProps, 'state' | 'setState'>

export interface CheckboxOptions {
  state?: State
}

export type CheckboxProps = React.ComponentPropsWithRef<typeof Checkbox> &
  CheckboxOptions

export { useCheckboxState }
export type { CheckboxStateReturn }
