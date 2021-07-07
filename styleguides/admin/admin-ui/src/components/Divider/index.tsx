import React from 'react'
import { jsx, PropsWithAs } from '@vtex/onda-react'
import { Separator as ReakitSeparator } from 'reakit'

const styles = {
  border: 'solid',
  borderWidth: 1,
  borderColor: 'mid.tertiary',
  margin: 0,
}

const _Divider = jsx.hr({
  text: 'headline',
  variants: {
    orientation: {
      horizontal: {
        ...styles,
        borderBottom: 0,
      },
      vertical: {
        ...styles,
        borderLeft: 0,
        height: 'auto',
      },
    },
  },
})

_Divider.defaultProps = {
  orientation: 'horizontal',
}

/**
 * It renders an hr element and grants accessibility as described on the [WAI-ARIA Separator Role](https://www.w3.org/TR/wai-aria-1.1/#separator).
 */
export function Divider(props: DividerProps) {
  // This is done due to the current limitation of our API regarding parent variant inheritances.
  // For more context on this, see https://github.com/vtex/onda/pull/667
  const divider = () => <_Divider {...props} />

  return <ReakitSeparator as={divider} />
}

interface _DividerProps {
  /**
   * Divider orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
}

export type DividerProps = PropsWithAs<_DividerProps, 'hr'>
