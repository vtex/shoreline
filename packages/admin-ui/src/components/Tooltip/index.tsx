import type {
  ComponentPropsWithRef,
  FunctionComponentElement,
  ReactNode,
} from 'react'
import React, { cloneElement } from 'react'
import type { TooltipStateReturn } from 'reakit/Tooltip'
import {
  useTooltipState,
  Tooltip as ReakitTooltip,
  TooltipReference,
} from 'reakit/Tooltip'
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
export const Tooltip = jsx.div(
  {},
  {
    options: ['state', 'children', 'label'],
    useOptions(options: TooltipOptions, props) {
      const { state, children, label } = options
      const { csx, ...htmlProps } = props

      return {
        ...htmlProps,
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
              {...htmlProps}
              csx={{
                backgroundColor: 'dark.primary',
                color: 'light.primary',
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

export interface TooltipOptions {
  state: TooltipStateReturn
  /**
   * The element that triggers the tooltip
   */
  children: FunctionComponentElement<unknown>
  /**
   * Label shown inside the tooltip
   */
  label: ReactNode
}

export type TooltipProps = ComponentPropsWithRef<typeof Tooltip>
export { useTooltipState }
