import { cx } from '@vtex/admin-ui-core'
import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { Separator as ReakitSeparator } from 'reakit/Separator'

import * as style from './divider.css'

/**
 * It renders an hr element and grants accessibility as described on the [WAI-ARIA Separator Role](https://www.w3.org/TR/wai-aria-1.1/#separator).
 */
export const Divider = forwardRef(
  (props: DividerProps, ref: Ref<HTMLHRElement>) => {
    const { orientation = 'horizontal', className = '', ...restProps } = props

    return (
      <ReakitSeparator
        ref={ref}
        className={cx(className, style.dividerTheme)}
        orientation={orientation}
        data-orientation={orientation}
        {...restProps}
      />
    )
  }
)

type DividerOrientation = 'vertical' | 'horizontal'
interface DividerProps extends ComponentPropsWithoutRef<'hr'> {
  orientation?: DividerOrientation
}

export type { DividerOrientation, DividerProps }
