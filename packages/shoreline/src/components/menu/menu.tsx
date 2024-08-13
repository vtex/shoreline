import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { forwardRef } from 'react'
import { MenuPopover } from './menu-popover'
import type { MenuProviderOptions } from './menu-provider'
import { MenuProvider } from './menu-provider'
import { MenuTrigger } from './menu-trigger'
import type { ButtonProps } from '../button'
import { Button } from '../button'
import { IconCaretDownSmall, IconDotsThreeVertical } from '../../icons'
import { IconButton } from '../icon-button'

/**
 * Menus summarize actions in a dropdown. They can include actions that are rarely used, complementary, or repeated for each item in a Collection.
 * @status stable
 * @example
 * <Menu label="Open">
 *  <MenuItem>Item 1</MenuItem>
 * </Menu>
 */
export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  function Menu(props, ref) {
    const {
      children,
      label,
      asChild = false,
      variant = 'secondary',
      type = 'menu',
      iconOnly = false,
      size = 'normal',
      open,
      setOpen,
      defaultOpen,
      store,
      placement,
      disabled,
      ...domProps
    } = props

    const Icon = getIcon(type)

    return (
      <div data-sl-menu ref={ref} {...domProps}>
        <MenuProvider
          open={open}
          setOpen={setOpen}
          defaultOpen={defaultOpen}
          store={store}
          placement={placement}
        >
          <MenuTrigger disabled={disabled} asChild>
            {iconOnly ? (
              <IconButton label={label} variant={variant} size={size}>
                {Icon}
              </IconButton>
            ) : (
              <Button variant={variant} size={size}>
                {type === 'actions' && Icon}
                {label}
                {type === 'menu' && Icon}
              </Button>
            )}
          </MenuTrigger>
          <MenuPopover>{children}</MenuPopover>
        </MenuProvider>
      </div>
    )
  }
)

function getIcon(type: MenuProps['type'] = 'menu') {
  switch (type) {
    case 'menu':
      return <IconCaretDownSmall />

    case 'actions':
      return <IconDotsThreeVertical />

    default:
      return <IconCaretDownSmall />
  }
}

type InheritedOptions = Pick<ButtonProps, 'variant' | 'size' | 'disabled'> &
  Pick<
    MenuProviderOptions,
    'open' | 'setOpen' | 'defaultOpen' | 'store' | 'placement'
  >

export interface MenuOptions extends InheritedOptions {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Trigger label
   */
  label: ReactNode
  /**
   * Type of dropdown
   * @default 'menu'
   */
  type?: 'menu' | 'actions'
  /**
   * Hide the textual label
   * @default false
   */
  iconOnly?: boolean
}

export type MenuProps = MenuOptions & ComponentPropsWithoutRef<'div'>
