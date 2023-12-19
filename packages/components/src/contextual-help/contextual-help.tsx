import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { PopoverProviderProps } from '../popover'
import { PopoverProvider, PopoverTrigger, Popover } from '../popover'
import { Button } from '../button'
import { Container, Content } from '../content'
import './contextual-help.css'

/**
 * Merchants contextually understand the definition of an item through an overlay, that can be interactive, when clicking on the trigger.
 *
 * @example
 * <ContextualHelp label="Meaningful label">
 *  Help message
 * </ContextualHelp>
 */
export const ContextualHelp = forwardRef<HTMLDivElement, ContextualHelpProps>(
  function ContextualHelp(props, ref) {
    const {
      children,
      className,
      label,
      open,
      setOpen,
      defaultOpen,
      store,
      placement,
      narrow = false,
      ...otherProps
    } = props

    return (
      <div data-sl-contextual-help className={className}>
        <PopoverProvider
          open={open}
          setOpen={setOpen}
          defaultOpen={defaultOpen}
          store={store}
          placement={placement}
        >
          <PopoverTrigger asChild>
            <Button data-sl-contextual-help-trigger aria-label={label}>
              <div data-sl-contextual-help-trigger-bg>?</div>
            </Button>
          </PopoverTrigger>
          <Popover
            data-sl-contextual-help-popover
            ref={ref}
            {...otherProps}
            asChild
          >
            <Container>
              <Content narrow={narrow}>{children}</Content>
            </Container>
          </Popover>
        </PopoverProvider>
      </div>
    )
  }
)

/**
 * Props for the ContextualHelp component
 */
export interface ContextualHelpProps
  extends ComponentPropsWithoutRef<'div'>,
    Pick<
      PopoverProviderProps,
      'open' | 'setOpen' | 'defaultOpen' | 'store' | 'placement'
    > {
  /**
   * aria-abel for the contextual help trigger
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  label: string
  /**
   * Children prop
   */
  children?: ReactNode
  /**
   * Controls the padding of the contextual help popover.
   * This prop defines whether it should be narrow or not.
   * It is not narrow by default.
   *
   * @default false
   */
  narrow?: boolean
}
