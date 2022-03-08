import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { Tabbable } from 'reakit/Tabbable'
import { useComposite } from 'reakit/Composite'
import { tag } from '@vtex/admin-ui-react'

import type { SetProps } from '../../Set'
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
    <tag.div
      as={Tabbable}
      orientation="vertical"
      csx={{
        width: SCALES.SIDEBAR_SECTION_WIDTH,
        zIndex: 'sidebarUl',
        marginBottom: '$xl',
      }}
      {...compositeProps}
      {...setProps}
      ref={ref}
    >
      <tag.div csx={{ margin: '$s', paddingY: '$l' }}>
        <Text variant="title1" tone="primary">
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
}
