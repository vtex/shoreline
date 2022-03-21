import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { merge } from '@vtex/admin-ui-util'
import { tag, useSystem } from '@vtex/admin-ui-react'

import type { ButtonProps } from '../../Button'
import { Button } from '../../Button'

export const SidebarDisclosure = forwardRef(function SidebarDisclosure(
  props: SidebarDisclosureProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    icon,
    selected,
    selectedFallback,
    label,
    csx = {},
    expandable,
    ...buttonProps
  } = props

  const { keyframes } = useSystem()

  const fadeIn = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
  `

  const bounce = keyframes`
    0% {
      transform: translate3d(0,0,0);
    }

    100% {
      transform: translate3d(0,1px,0);
    }
  `

  const arrowStyle = {
    ':after': {},
  }

  return (
    <tag.div csx={{ position: 'relative' }}>
      <Button
        ref={ref}
        variant="tertiary"
        icon={icon}
        title={label}
        name={label}
        csx={merge(
          {
            zIndex: 'sidebarDisclosure',
            bg: '$action.main.tertiary',
            transform: 'translate3d(0,0,0)',
            color: selectedFallback
              ? '$action.main.tertiarySelected'
              : '$secondary',
            ':active': {
              bg: 'transparent',
              transform: 'translate(0,1px)',
              ':after': {
                transform: 'rotate(45deg)',
                ...arrowStyle,
              },
              color: '$action.main.tertiaryPressed',
            },
            ...(expandable && selected && arrowStyle),
            ':hover': {
              ...(expandable && arrowStyle),
              color: '$action.main.tertiaryHover',
              bg: 'transparent',
            },
          },
          csx
        )}
        {...buttonProps}
      />
      {expandable && selected ? (
        <tag.div
          csx={{
            animation: `${fadeIn} 0.4s`,
            content: '" "',
            position: 'absolute',
            top: '15px' /* At the bottom of the tooltip */,
            right: '-14px',
            size: '12px',
            zIndex: 999,
            bg: '$secondary',
            border: '$neutral',
            transform: 'rotate(45deg)',
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
          }}
        />
      ) : null}
    </tag.div>
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
  selectedFallback?: boolean
  expandable?: boolean
}
