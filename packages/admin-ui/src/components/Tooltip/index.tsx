import type {
  ComponentPropsWithRef,
  FunctionComponentElement,
  ReactNode,
} from 'react'
import React, { Fragment, cloneElement } from 'react'

import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
} from 'reakit/Tooltip'
import type { PopoverState } from 'reakit/ts'
import { jsx, tag } from '@vtex/admin-ui-react'

/**
 * Popup that displays information related to an element on :focus (by keyboard) or :hover (by mouse).
 * @example
 * ```jsx
 * import { Tooltip, Button, IconClose } from `@vtex/admin-ui`
 * <Tooltip label="Close something">
 *   <Button icon={<IconClose />} variant="tertiary" />
 * </Tooltip>
 * ```
//  */
export const Tooltip = jsx(Fragment)(
  {},
  {
    options: ['placement', 'visible', 'fixed', 'baseId', 'children', 'label'],
    useOptions(options: TooltipOptions, props) {
      const {
        children,
        placement = 'top',
        visible,
        fixed,
        baseId,
        label,
      } = options

      const { csx, ...tooltipProps } = props

      const state = useTooltipState({
        placement,
        visible,
        unstable_fixed: fixed,
        baseId,
      })

      return {
        children: (
          <>
            <TooltipReference {...state} {...children.props} ref={children.ref}>
              {(referenceProps) =>
                cloneElement(children, { ...referenceProps })
              }
            </TooltipReference>
            <tag.div
              as={ReakitTooltip}
              {...state}
              {...tooltipProps}
              csx={{
                backgroundColor: '$inverted',
                color: '$inverted',
                fontSize: 1,
                paddingY: '0.5625rem',
                paddingX: 3,
                borderRadius: 3,
                maxWidth: 240,
                zIndex: 'over',
                ...csx,
              }}
            >
              {label}
            </tag.div>
          </>
        ),
      }
    },
  }
)

type TooltipPlacement = Pick<PopoverState, 'placement'>['placement']

export interface TooltipOptions {
  /**
   * The element that triggers the tooltip
   */
  children: FunctionComponentElement<unknown>
  /**
   * Label shown inside the tooltip
   */
  label: ReactNode
  /**
   * The placement of the tooltip relative to its children
   * @default 'top'
   */
  placement?: TooltipPlacement
  /**
   * Whether the tooltip is visible or not
   * @default false
   */
  visible?: boolean
  /**
   * Whether or not the tooltip popover should have position set to fixed.
   * @default false
   */
  fixed?: boolean
  /**
   * reakit base-id
   */
  baseId?: string
}

export type TooltipProps = ComponentPropsWithRef<typeof Tooltip>
