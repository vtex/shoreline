import React from 'react'
import { render, withState, axe } from '../../test-utils'

import { CollapsibleGroup } from './index'

import {
  useCollapsibleState,
  Collapsible,
  CollapsibleHeader,
  CollapsibleContent,
} from '../Collapsible'

const StatefulCollapsible = withState(Collapsible, () =>
  useCollapsibleState({ visible: true })
)

describe('CollapsibleGroup tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <CollapsibleGroup>
        <StatefulCollapsible>
          <CollapsibleHeader label="Collapsible Header" />
          <CollapsibleContent>Collapsible Content</CollapsibleContent>
        </StatefulCollapsible>
      </CollapsibleGroup>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
