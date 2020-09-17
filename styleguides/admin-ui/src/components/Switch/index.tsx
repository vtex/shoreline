/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { Ref } from 'react'
import {
  Checkbox,
  CheckboxProps,
  useCheckboxState,
  CheckboxStateReturn,
} from 'reakit'
import { useFocusRing } from '@react-aria/focus'
import { useComponentSx, mergeSx } from '@vtex-components/theme'
import { forwardRef } from '@vtex-components/utils'

import { Theme } from '../../theme'
import { VisuallyHidden } from '../VisuallyHidden'
import { Box } from '../Box'

export const Switch = forwardRef(
  (props: SwitchProps, ref: Ref<HTMLInputElement>) => {
    const { ariaLabel, sx = {}, size = 'regular', ...reakitProps } = props
    const { focusStyles, focusProps } = useFocusHollow()

    const styles = useComponentSx('switch', {
      size,
    })

    const mergedSx = mergeSx<SxStyleProp>({ ...styles, ...focusStyles }, sx)

    return (
      <Box el="label">
        <Checkbox
          ref={ref}
          role="switch"
          {...reakitProps}
          {...focusProps}
          sx={mergedSx}
        />
        <VisuallyHidden>{ariaLabel}</VisuallyHidden>
      </Box>
    )
  }
)

function useFocusHollow() {
  const { isFocusVisible, focusProps } = useFocusRing()
  const focusStyles = isFocusVisible
    ? {
        backgroundColor: 'muted.0',
        borderColor: 'muted.0',
        boxShadow: (theme: Theme) =>
          `0rem 0rem 0rem ${theme.sizes[2]} ${theme.colors.focus}`,
      }
    : {}

  return { focusStyles, focusProps }
}

export interface SwitchProps
  extends Pick<
    CheckboxProps,
    | 'checked'
    | 'required'
    | 'disabled'
    | 'value'
    | 'name'
    | 'onChange'
    | 'state'
    | 'setState'
  > {
  /** ThemeUI style prop
   * @default {}
   */
  sx?: SxStyleProp
  /**
   * Visually hidden label to grant Accesibility
   */
  ariaLabel: string
  /**
   * Switch Size
   * @default regular
   */
  size?: 'regular' | 'small'
}

export { useCheckboxState as useSwitch }
export { CheckboxStateReturn }
