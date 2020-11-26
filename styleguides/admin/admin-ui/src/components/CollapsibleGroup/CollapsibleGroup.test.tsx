import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import { CollapsibleGroup } from './index'
import { ThemeProvider } from '../../system'
import { useCollapsible, DisclosureStateReturn } from '../Collapsible'

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
              <CollapsibleGroup.Item state={state}>
                <CollapsibleGroup.Item.Header label="Collapsible Header" />
                <CollapsibleGroup.Item.Content>
                  Collapsible Content
                </CollapsibleGroup.Item.Content>
              </CollapsibleGroup.Item>
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
              <CollapsibleGroup.Item state={state}>
                <CollapsibleGroup.Item.Header label="Collapsible Header" />
                <CollapsibleGroup.Item.Content>
                  Collapsible Content
                </CollapsibleGroup.Item.Content>
              </CollapsibleGroup.Item>
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
              <CollapsibleGroup.Item state={state}>
                <CollapsibleGroup.Item.Header label="Collapsible Header" />
                <CollapsibleGroup.Item.Content>
                  Collapsible Content
                </CollapsibleGroup.Item.Content>
              </CollapsibleGroup.Item>
            )}
          </CollapsibleState>
          {null}
        </CollapsibleGroup>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
