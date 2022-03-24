import type { ReactNode, Ref } from 'react'
import React, { forwardRef } from 'react'
import { merge } from '@vtex/admin-ui-util'
import { tag, useSystem } from '@vtex/admin-ui-react'

import { Center } from '../../Center'
import type { ButtonProps } from '../../Button'
import { Button } from '../../Button'
import { useSidebarContext } from './SidebarContext'

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

  const state = useSidebarContext()

  const { keyframes } = useSystem()

  const fadeIn = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
  `

  return (
    <Center
      csx={{
        borderLeft: selectedFallback ? '$mainSelected' : 'solid transparent',
        borderRight: 'solid transparent 3px',
        borderLeftWidth: '3px',
        zIndex: 9999,
        position: 'relative',
        width: '100%',
        paddingX: '5px',
      }}
    >
      <Button
        ref={ref}
        variant="tertiary"
        icon={icon}
        title={state.layout.reduced ? label : undefined}
        name={label}
        csx={merge(
          {
            cursor: selectedFallback ? 'auto' : 'pointer',
            bg: '$action.neutral.tertiary',
            transform: 'translate3d(0,0,0)',
            color: selectedFallback
              ? '$action.main.tertiarySelected'
              : '$action.neutral.tertiary',
            ':active': {
              bg: selectedFallback
                ? 'transparent'
                : '$action.neutral.tertiaryHover',
              color: selectedFallback ? 'none' : 'currentColor',
            },
            ':hover': {
              color: selectedFallback
                ? 'none'
                : '$action.neutral.tertiaryHover',
              bg: selectedFallback
                ? 'transparent'
                : '$action.neutral.tertiaryHover',
            },
            size: 'auto',
            padding: '0.5rem',
            svg: { margin: 0 },
          },
          csx
        )}
        {...buttonProps}
      />

      {!state.isReduced() && expandable && selected ? (
        <tag.div
          csx={{
            animation: `${fadeIn} 0.4s`,
            position: 'absolute',
            top: '15px' /* At the bottom of the tooltip */,
            right: '-10px',
            size: '12px',
            zIndex: 2,
            bg: '$secondary',
            border: '$neutral',
            transform: 'rotate(45deg)',
            borderTopColor: 'transparent',
            borderRightColor: 'transparent',
          }}
        />
      ) : null}
    </Center>
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
