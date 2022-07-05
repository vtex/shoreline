import React from 'react'
import { render, withState, axe } from '../../../test-utils'

import {
  Collapsible,
  useCollapsibleState,
  CollapsibleHeader,
  CollapsibleContent,
} from '../index'

const StatefulCollapsible = withState(Collapsible, () =>
  useCollapsibleState({ visible: true })
)

describe('Collapsible', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <StatefulCollapsible>
        <CollapsibleHeader label="Collapsible Label" />
        <CollapsibleContent>Collapsible Content</CollapsibleContent>
      </StatefulCollapsible>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
