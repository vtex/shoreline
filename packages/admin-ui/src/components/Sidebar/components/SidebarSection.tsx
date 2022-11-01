import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { Tabbable } from 'reakit/Tabbable'
import { useComposite } from 'reakit/Composite'
import type { ComponentStyleProps } from '@vtex/admin-ui-react'
import type { StyleProp } from '@vtex/admin-ui-core'

import { Box } from '../../../box'
import { Text } from '../../Text'
import { useItemContext } from './SidebarContext'

/**
 * Each SidebarSection is responsible for defining the scope of a section within a sidebar item.
 * It holds the SidebarSectionItem, which
 * is the last node of the sidebar tree and where clients
 * will interact most to perform actions.
 *
 */
export const SidebarSection = forwardRef(function SidebarSection(
  props: SidebarSectionProps,
  ref: Ref<HTMLDivElement>
) {
  const { title, position, children, csx, ...divProps } = props
  const { state } = useItemContext()
  const compositeProps = useComposite({ ...state, baseId: 'section--' })

  const firstSection = position === 0

  const sectionTitleStyle: StyleProp = firstSection
    ? { text: '$title1' }
    : {
        text: '$action1',
        fontSize: '0.6875rem',
        fontSettings: 'medium',
        textTransform: 'uppercase',
      }

  return (
    <Box
      as={Tabbable}
      csx={{
        zIndex: 'sidebarUl',
        marginBottom: '$space-4',
        ...csx,
      }}
      {...compositeProps}
      {...divProps}
      ref={ref}
    >
      <Box
        csx={{
          padding: '$space-2 $space-3',
          marginY: firstSection ? '$space-2' : '',
        }}
      >
        <Text csx={sectionTitleStyle} tone="primary">
          {title}
        </Text>
      </Box>
      {children}
    </Box>
  )
})

type DivWithCsx = Omit<
  ComponentPropsWithoutRef<'div'>,
  keyof ComponentStyleProps
> &
  ComponentStyleProps

export interface SidebarSectionProps extends DivWithCsx {
  /**
   * `title` of a section. This is what separates each item's section.
   */
  title: string
  /**
   * Section's position
   * @internal
   */
  position?: number
}
