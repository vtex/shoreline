import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import type { PopoverProviderProps } from '../popover'
import { PopoverProvider, PopoverTrigger, Popover } from '../popover'
import { IconButton } from '../icon-button'
import { Container, Content } from '../content'

/**
 * Contextual Help is represented by a question mark trigger that is positioned next to an element and displays its definition when clicked.
 * @status stable
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
            <IconButton data-sl-contextual-help-trigger label={label}>
              <div data-sl-contextual-help-trigger-bg>?</div>
            </IconButton>
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

export type PopoverOptions = Pick<
  PopoverProviderProps,
  'open' | 'setOpen' | 'defaultOpen' | 'store' | 'placement'
>

export interface ContextualHelpOptions extends PopoverOptions {
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

export type ContextualHelpProps = ContextualHelpOptions &
  ComponentPropsWithoutRef<'div'>
