import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'
import { Role } from 'reakit/Role'

export const Box = createComponent<typeof Role>((props) =>
  useElement(Role, props)
)

export type BoxProps = ComponentPropsWithRef<typeof Box>
