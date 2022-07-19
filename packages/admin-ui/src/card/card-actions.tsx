import React from 'react'
import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Stack } from '../stack'
import { Bleed } from '../bleed'

export const CardActions = createComponent<'div'>((props) => {
  const { children, ...restProps } = props

  return useElement('div', {
    ...restProps,
    children: (
      <Bleed top="$l">
        <Stack direction="row" space="$l">
          {children}
        </Stack>
      </Bleed>
    ),
  })
})

export type CardActionsProps = ComponentPropsWithRef<typeof CardActions>
