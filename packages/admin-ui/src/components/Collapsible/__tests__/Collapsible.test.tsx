import React from 'react'
import { render, withState } from '../../../test-utils'

import {
  Collapsible,
  useCollapsibleState,
  CollapsibleHeader,
  CollapsibleContent,
} from '../index'

const StatefulCollapsible = withState(Collapsible, () =>
  useCollapsibleState({ baseId: 'mocked-id', visible: true })
)

describe('Collapsible', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <StatefulCollapsible data-testid="collapsible" csx={{ bg: 'azure' }}>
        <CollapsibleHeader
          label="Collapsible Label"
          data-testid="header"
          csx={{ bg: 'azure' }}
        />
        <CollapsibleContent data-testid="content" csx={{ bg: 'azure' }}>
          Collapsible Content
        </CollapsibleContent>
      </StatefulCollapsible>
    )

    expect(getByTestId('collapsible')).toHaveStyleRule('background', 'azure')
    expect(getByTestId('header')).toHaveStyleRule('background', 'azure')
    expect(getByTestId('content')).toHaveStyleRule('background', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <StatefulCollapsible>
        <CollapsibleHeader label="Collapsible Label" />
        <CollapsibleContent>Collapsible Content</CollapsibleContent>
      </StatefulCollapsible>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with nesting collapsibles', () => {
    const { asFragment } = render(
      <StatefulCollapsible>
        <CollapsibleHeader label="Collapsible Label" />
        <CollapsibleContent>
          <StatefulCollapsible>
            <CollapsibleHeader label="Collapsible Label" />
            <CollapsibleContent>Collapsible Content</CollapsibleContent>
          </StatefulCollapsible>
        </CollapsibleContent>
      </StatefulCollapsible>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
