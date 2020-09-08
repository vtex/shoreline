/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { Separator, SeparatorProps } from 'reakit'
import { useComponentSx, mergeSx } from '@vtex-components/theme'

/**
 * Elementary accessible hr component that can be reused by all VTEX Styleguides.
 * You can use reakit full features (except the 'as' prop) and theme-ui's sx.
 * It renders a hr element by default.
 * This is a styled base component, so any system can theme it.
 * You may configure your `components.divider` property of the theme object.
 * @example
 * ```jsx
 * import { Divider } from `@vtex-components/divider`
 *
 * const theme = {

 *  components: {
      styles: { color: muted.4 },
 *    divider: {
 *      orientation: {
 *        vertical: { marginX: 3 },
 *        horizontal: { marginY : 3 },
 *      },
 *    }
 *  }
 * }
 *
 * <Divider orientation="horizontal" />
 * ```
 */
function Divider(props: DividerProps) {
  const { sx = {}, orientation = 'horizontal' } = props

  const styles = useComponentSx('divider', { orientation })

  return (
    <Separator
      sx={mergeSx<SxStyleProp>(styles, sx)}
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
