import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComponentPropsWithoutRef } from 'react'

import { centerStyle } from './center.style'

/**
 * Layout that aligns its children on the center
 * @example
 * import { Center } from `@vtex/admin-ui`
 * <Center>Centralized content</Center>
 */
export const Center = createComponent<'div'>((props) =>
  useElement('div', {
    ...props,
    baseStyle: centerStyle,
  })
)

Center.displayName = 'Center'

export type CenterProps = ComponentPropsWithoutRef<typeof Center>
