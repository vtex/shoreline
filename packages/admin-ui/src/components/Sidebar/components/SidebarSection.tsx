import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { Tabbable } from 'reakit/Tabbable'
import { useComposite } from 'reakit/Composite'

import type { SetProps } from '../../Set'
import { Set } from '../../Set'
import { Text } from '../../Text'
import { useItemContext } from './SidebarContext'
import { SCALES } from '../consts'

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
  const { title, children, ...setProps } = props
  const { state } = useItemContext()
  const compositeProps = useComposite({ ...state, baseId: 'section--' })

  return (
    <Set
      as={Tabbable}
      spacing={0.5}
      orientation="vertical"
      csx={{
        width: SCALES.SIDEBAR_SECTION_WIDTH,
        paddingBottom: 8,
        zIndex: 'sidebarUl',
      }}
      {...compositeProps}
      {...setProps}
      ref={ref}
    >
      <Text
        variant="action1"
        tone="primary"
        csx={{
          fontSize: '0.6875rem',
          paddingBottom: '0.8125rem',
          paddingX: '0.75rem',
          fontSettings: 'medium',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Text>
      {children}
    </Set>
  )
})

export interface SidebarSectionProps extends SetProps {
  /**
   * `title` of a section. This is what separates each item's section.
   */
  title: string
}
