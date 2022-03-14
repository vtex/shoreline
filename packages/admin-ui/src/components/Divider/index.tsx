import { jsx } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'
import { Separator as ReakitSeparator } from 'reakit/Separator'

/**
 * It renders an hr element and grants accessibility as described on the [WAI-ARIA Separator Role](https://www.w3.org/TR/wai-aria-1.1/#separator).
 */
export const Divider = jsx(ReakitSeparator)({
  border: '$neutral',
  margin: 0,
  variants: {
    orientation: {
      horizontal: {
        borderBottom: 0,
      },
      vertical: {
        borderLeft: 0,
        height: 'auto',
      },
    },
  },
})

Divider.defaultProps = {
  /**
   * Divider orientation
   * @default 'horizontal'
   */
  orientation: 'horizontal',
}

export type DividerProps = ComponentPropsWithRef<typeof Divider>
