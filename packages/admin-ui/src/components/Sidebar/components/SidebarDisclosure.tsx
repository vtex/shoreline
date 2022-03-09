import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { merge } from '@vtex/admin-ui-util'

import type { ButtonProps } from '../../Button'
import { Button } from '../../Button'

export const SidebarDisclosure = forwardRef(function SidebarDisclosure(
  props: SidebarDisclosureProps,
  ref: Ref<HTMLButtonElement>
) {
  const { icon, selected, label, csx = {}, ...buttonProps } = props

  return (
    <Button
      ref={ref}
      variant="tertiary"
      icon={icon}
      title={label}
      name={label}
      csx={merge(
        {
          zIndex: 'sidebarDisclosure',
          bg: selected
            ? '$action.neutral.tertiaryHover'
            : '$action.main.tertiary',
          color: selected ? '$action.main.tertiarySelected' : '$secondary',
          ':active': {
            bg: '$action.neutral.tertiaryPressed',
            color: '$action.main.tertiaryPressed',
          },
          ':hover': {
            bg: '$action.neutral.tertiaryHover',
            color: '$action.main.tertiaryHover',
          },
        },
        csx
      )}
      {...buttonProps}
    />
  )
})

export interface SidebarDisclosureProps
  extends Omit<ButtonProps, 'children' | 'icon'> {
  /**
   * `icon` which the `<Sidebar.Item {...props} />` disclosure should exhibit.
   */
  icon: ReactNode
  /**
   * `label` of a `<Sidebar.Item {...props} />`. This is set as the components`
   * composite ID and its value is displayed on the tooltip.
   */
  label: string
  /**
   * Note that, if the `Sidebar.Item` component have children,
   * setting this to `true` will have no effect. This is because
   * we give precedence to the `Sidebar.Item.Section.Item`'s `select`
   * property.
   */
  selected?: boolean
}
