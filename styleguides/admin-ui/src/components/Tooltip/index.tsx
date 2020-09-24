import React from 'react'
import BaseTooltip, {
  TooltipProps as BaseProps,
} from '@vtex-components/tooltip'

/**
 * Popup that displays information related to an element on :focus (by keyboard) or :hover (by mouse).
 * @example
 * ```jsx
 * import { Tooltip, Button, IconClose } from `@vtex/admin-ui`
 * <Tooltip label="Close something">
 *   <Button icon={<IconClose />} variant="text" />
 * </Tooltip>
 * ```
 */
export function Tooltip(props: TooltipProps) {
  return <BaseTooltip variant="overlay.tooltip" {...props} />
}

export type TooltipProps = Pick<
  BaseProps,
  'children' | 'label' | 'placement' | 'visible' | 'sx'
>
