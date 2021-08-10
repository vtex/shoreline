import React from 'react'
import { jsx } from '@vtex/onda-react'

import { Toolbar as BaseToolbar, useToolbarState } from '../../Toolbar'
import type { ButtonProps } from '../../Button'
import { Button as BaseButton } from '../../Button'

const _Toolbar = jsx(BaseToolbar)(
  {
    padding: 0,
  },
  {
    useOptions(_: { state?: unknown }, props) {
      const state = useToolbarState({ loop: true })

      return {
        ...props,
        state,
      }
    },
  }
)

_Toolbar.defaultProps = {
  spacing: 0,
}

function Button(props: ButtonProps) {
  const { variant = 'adaptative-dark', size = 'small', ...buttonProps } = props

  return (
    <BaseToolbar.Item>
      {(itemProps) => (
        <BaseButton
          variant={variant}
          size={size}
          {...itemProps}
          {...buttonProps}
        />
      )}
    </BaseToolbar.Item>
  )
}

export const Toolbar = Object.assign(_Toolbar, {
  Button,
})
