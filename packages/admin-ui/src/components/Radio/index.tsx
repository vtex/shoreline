import type { ComponentPropsWithRef } from 'react'
import type { RadioStateReturn } from 'reakit/Radio'
import { Radio as ReakitRadio } from 'reakit/Radio'
import { jsx } from '@vtex/admin-ui-react'

import * as style from './Radio.style'

export const Radio = jsx(ReakitRadio)(
  {
    ...style.baseline,
    ':after': style.checkmark,
    ':checked': style.checked,

    variants: {
      size: {
        regular: style.regular,
        small: style.small,
      },
    },
  },
  {
    options: ['state'],
    useOptions: (options: RadioOptions, props) => {
      const { state } = options

      return { ...props, ...state }
    },
  }
)

Radio.defaultProps = {
  size: 'regular',
}

export interface RadioOptions {
  state: RadioStateReturn
}

export type RadioProps = ComponentPropsWithRef<typeof Radio> & RadioOptions

export { useRadioState, RadioStateReturn } from 'reakit/Radio'
