import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { Tabbable } from 'reakit/Tabbable'
import { useComposite } from 'reakit/Composite'
import { tag } from '@vtex/admin-ui-react'
import type { StyleProp } from '@vtex/admin-ui-core'

import type { SetProps } from '../../Set'
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
  const { title, position, children, ...divProps } = props
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
    <tag.div
      as={Tabbable}
      orientation="vertical"
      csx={{
        zIndex: 'sidebarUl',
        marginBottom: '$xl',
      }}
      {...compositeProps}
      {...divProps}
      ref={ref}
    >
      <tag.div csx={{ margin: '$s', paddingY: firstSection ? '$l' : '' }}>
        <Text csx={sectionTitleStyle} tone="primary">
          {title}
        </Text>
      </tag.div>
      {children}
    </tag.div>
  )
})

export interface SidebarSectionProps extends SetProps {
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
