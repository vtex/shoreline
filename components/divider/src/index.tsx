/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { Separator, SeparatorProps } from 'reakit'

/**
 * Elementary accessible hr component that can be reused by all VTEX Styleguides.
 * You can use reakit full features (except the 'as' prop) and theme-ui's sx.
 * It renders a hr element by default.
 * This is a styled base component, so any system can theme it.
 * You may configure your `components.divider` property of the theme object.
 * @example
 * ```jsx
 * import Divider from `@vtex-components/divider`
 *
 * <Divider orientation="horizontal" />
 * ```
 */
function Divider(props: DividerProps) {
  const { sx = {}, orientation = 'horizontal', ...restProps } = props

  return (
    <Separator
      {...restProps}
      sx={{ variant: `divider.${orientation}`, ...sx }}
      orientation={orientation}
    />
  )
}

export interface DividerProps
  extends Omit<SeparatorProps, 'orientation' | 'as'> {
  /**
   * ThemeUI sx prop
   * @default {}
   */
  sx?: SxStyleProp
  /**
   * Divider orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
}

export default Divider
