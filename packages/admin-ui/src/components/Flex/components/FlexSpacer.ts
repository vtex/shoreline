import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

export const FlexSpacer = jsx('div')({
  flex: 1,
  justifySelf: 'stretch',
  alignSelf: 'stretch',
})

export type FlexSpacerProps = ComponentPropsWithRef<typeof FlexSpacer>
