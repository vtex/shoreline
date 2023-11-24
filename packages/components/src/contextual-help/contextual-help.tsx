import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React, { forwardRef } from 'react'
import './contextual-help.css'
import type { PopoverProviderProps } from '../popover'
import { PopoverProvider, PopoverTrigger, Popover } from '../popover'
import { Action } from '../action'
import { IconQuestion } from '@vtex/shoreline-icons'
import { Content } from '../content'

/**
 * Shows the user information relative to a context
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
      ...otherProps
    } = props

    return (
      <div data-sl-contextual-help className={className}>
        <PopoverProvider
          open={open}
          setOpen={setOpen}
          defaultOpen={defaultOpen}
          store={store}
        >
          <PopoverTrigger asChild>
            <Action label={label} iconOnly>
              <IconQuestion />
            </Action>
          </PopoverTrigger>
          <Popover data-sl-contextual-help-popover ref={ref} {...otherProps}>
            <Content>{children}</Content>
          </Popover>
        </PopoverProvider>
      </div>
    )
  }
)

export interface ContextualHelpProps
  extends ComponentPropsWithoutRef<'div'>,
    Pick<PopoverProviderProps, 'open' | 'setOpen' | 'defaultOpen' | 'store'> {
  /**
   * Label for the help
   */
  label: string
  /**
   * Children prop
   */
  children?: ReactNode
}
