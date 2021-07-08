import { jsx } from '@vtex/onda-react'
import { Separator as ReakitSeparator } from 'reakit'

const styles = {
  border: 'solid',
  borderWidth: 1,
  borderColor: 'mid.tertiary',
  margin: 0,
}

/**
 * It renders an hr element and grants accessibility as described on the [WAI-ARIA Separator Role](https://www.w3.org/TR/wai-aria-1.1/#separator).
 */
export const Divider = jsx(ReakitSeparator)({
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

Divider.defaultProps = {
  /**
   * Divider orientation
   * @default 'horizontal'
   */
  orientation: 'horizontal',
}
