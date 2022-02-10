import React from 'react'
import { render, withState } from '../../test-utils'

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
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <CollapsibleGroup data-testid="collapsible-group" csx={{ bg: 'azure' }}>
        <StatefulCollapsible>
          <CollapsibleHeader label="Collapsible Header" />
          <CollapsibleContent>Collapsible Content</CollapsibleContent>
        </StatefulCollapsible>
      </CollapsibleGroup>
    )

    expect(getByTestId('collapsible-group')).toHaveStyleRule(
      'background',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <CollapsibleGroup>
        <StatefulCollapsible>
          <CollapsibleHeader label="Collapsible Header" />
          <CollapsibleContent>Collapsible Content</CollapsibleContent>
        </StatefulCollapsible>
      </CollapsibleGroup>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not render invalid children', () => {
    const { asFragment } = render(
      <CollapsibleGroup>
        {undefined}
        <StatefulCollapsible>
          <CollapsibleHeader label="Collapsible Header" />
          <CollapsibleContent>Collapsible Content</CollapsibleContent>
        </StatefulCollapsible>
        {null}
      </CollapsibleGroup>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
