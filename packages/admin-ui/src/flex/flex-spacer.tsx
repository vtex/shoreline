import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

export const FlexSpacer = createComponent<'div'>((props) => {
  return useElement('div', {
    baseStyle: { flex: 1, justifySelf: 'stretch', alignSelf: 'stretch' },
    ...props,
  })
})

export type FlexSpacerProps = ComponentPropsWithRef<typeof FlexSpacer>
