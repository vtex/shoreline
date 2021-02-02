import React from 'react'
import { render } from '@testing-library/react'

import { CollapsibleGroup } from './index'
import { ThemeProvider } from '@vtex/admin-core'
import {
  useCollapsible,
  Collapsible,
  DisclosureStateReturn,
} from '../Collapsible'

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
        <CollapsibleGroup
          data-testid="collapsible-group"
          styleOverrides={{ bg: 'azure' }}
        >
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
