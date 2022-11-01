import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Stack } from '../stack'

export const CardInfo = createComponent<'div'>((props) => {
  const { children, ...restProps } = props

  return useElement('div', {
    ...restProps,
    children: (
      <Stack direction="row" space="$space-3">
        {children}
      </Stack>
    ),
  })
})

export type CardInfoProps = ComponentPropsWithRef<typeof CardInfo>
