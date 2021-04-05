import React, { forwardRef, ReactNode, Ref } from 'react'
import { merge } from '@vtex/admin-core'

import { ButtonProps, Button } from '../../../Button'
import { Tooltip } from '../../../Tooltip'

export const SidebarDisclosure = forwardRef(function SidebarDisclosure(
  props: SidebarDisclosureProps,
  ref: Ref<HTMLButtonElement>
) {
  const { icon, selected, label, csx = {}, ...buttonProps } = props

  return (
    <Tooltip
      label={label}
      placement="right"
      csx={{
        display: 'flex',
        alignItems: 'center',
        fontSize: 0,
        paddingY: 1,
        paddingX: 2,
        borderRadius: 'default',
        minHeight: 24,
        zIndex: 'over',
      }}
    >
      <Button
        ref={ref}
        variant="tertiary"
        icon={icon}
        csx={merge(
          {
            zIndex: 'sidebarDisclosure',
            backgroundColor: selected ? 'sidebar.hover' : 'unset',
            'div > svg': {
              color: selected ? 'unset' : 'sidebar.dark',
            },
            '&:hover': {
              backgroundColor: 'sidebar.hover',
              'div > svg': {
                color: 'blue',
                opacity: 1,
              },
            },
          },
          csx
        )}
        {...buttonProps}
      />
    </Tooltip>
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
   * This prop is shared between this component and the `<Sidebar.Item {...props} />`.
   * It indicates whether its parent component is selected or not, and is used here
   * for styling only.
   */
  selected?: boolean
}
