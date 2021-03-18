import React, { forwardRef, ReactNode, Ref } from 'react'
import { merge } from '@vtex/admin-core'

import { useSidebarContext } from '../context'
import { ButtonProps, Button } from '../../Button'
import { Tooltip } from '../../Tooltip'

export const SidebarDisclosure = forwardRef(function SidebarDisclosure(
  props: SidebarDisclosureProps,
  ref: Ref<HTMLButtonElement>
) {
  const { icon, selected, label, csx = {}, ...buttonProps } = props
  const { direction } = useSidebarContext()

  return (
    <Tooltip label={label} placement={direction}>
      <Button
        ref={ref}
        variant="tertiary"
        icon={icon}
        csx={merge(
          {
            backgroundColor: selected ? 'sidebar.hover' : 'unset',
            'div > svg': {
              color: selected ? 'unset' : 'sidebar.dark',
            },
            '&:hover, &:focus': {
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

export interface SidebarDisclosureProps extends ButtonProps {
  /**
   * `icon` which the `<Sidebar.Item {...props} />` disclosure should exhibit.
   */
  icon: ReactNode
  /**
   * `label` of a `<Sidebar.Item {...props} />`. This is set as the components`
   * composite ID and its value is displayed on the tooltip.
   */
  label: string
  onClick: (event?: React.MouseEvent<any, MouseEvent>) => void
  /**
   * This props is shared between this component and the `<Sidebar.Item {...props} />`.
   * It indicates whether its parent component is selected or not, and is used here
   * for styling only.
   */
  selected?: boolean
}
