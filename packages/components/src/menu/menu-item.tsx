import type { ComponentPropsWithoutRef } from 'react'
import { MenuItem as BaseMenuItem } from '@ariakit/react'
import './menu-item.css'
import { slComponent, useAriakitComposition } from '@vtex/shoreline-utils'

export const MenuItem = slComponent<MenuItemProps>(BaseMenuItem, {
  name: 'menu-item',
  useProps(props) {
    const { critical = false, disabled = false, ...otherProps } = props

    return {
      'data-disabled': disabled,
      'data-critical': critical,
      disabled,
      ...otherProps,
    }
  },
  useComposition: useAriakitComposition,
})

export interface MenuItemProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Children composition
   * @default false
   */
  asChild?: boolean
  /**
   * Wether is critical
   * @default false
   */
  critical?: boolean
  /**
   * Wether is disabled
   * @default false
   */
  disabled?: boolean
}
