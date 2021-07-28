import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@vtex/admin-core'

import { CollapsibleGroup } from './index'
import type { DisclosureStateReturn } from '../Collapsible'
import { useCollapsible, Collapsible } from '../Collapsible'

function CollapsibleState({
  children,
}: {
  children: (state: DisclosureStateReturn) => JSX.Element
}) {
  const state = useCollapsible({ baseId: 'mocked-id' })

  return children(state)
}

describe('CollapsibleGroup tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CollapsibleGroup data-testid="collapsible-group" csx={{ bg: 'azure' }}>
          <CollapsibleState>
            {(state) => (
              <Collapsible state={state}>
                <Collapsible.Header label="Collapsible Header" />
                <Collapsible.Content>Collapsible Content</Collapsible.Content>
              </Collapsible>
            )}
          </CollapsibleState>
        </CollapsibleGroup>
      </ThemeProvider>
    )

    expect(getByTestId('collapsible-group')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <CollapsibleGroup>
          <CollapsibleState>
            {(state) => (
              <Collapsible state={state}>
                <Collapsible.Header label="Collapsible Header" />
                <Collapsible.Content>Collapsible Content</Collapsible.Content>
              </Collapsible>
            )}
          </CollapsibleState>
        </CollapsibleGroup>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not render invalid children', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <CollapsibleGroup>
          {undefined}
          <CollapsibleState>
            {(state) => (
              <Collapsible state={state}>
                <Collapsible.Header label="Collapsible Header" />
                <Collapsible.Content>Collapsible Content</Collapsible.Content>
              </Collapsible>
            )}
          </CollapsibleState>
          {null}
        </CollapsibleGroup>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
