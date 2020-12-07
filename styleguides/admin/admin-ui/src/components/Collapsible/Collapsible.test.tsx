import React from 'react'
import { render } from '@testing-library/react'

import { Collapsible, useCollapsible, DisclosureStateReturn } from './index'
import { ThemeProvider } from '../../system'

function CollapsibleState({
  children,
}: {
  children: (state: DisclosureStateReturn) => JSX.Element
}) {
  const state = useCollapsible({ baseId: 'mocked-id', visible: true })

  return children(state)
}

describe('Collapsible tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <CollapsibleState>
          {(state) => (
            <Collapsible
              state={state}
              data-testid="collapsible"
              styleOverrides={{ bg: 'azure' }}
            >
              <Collapsible.Header
                label="Collapsible Label"
                data-testid="header"
                styleOverrides={{ bg: 'azure' }}
              />
              <Collapsible.Content
                data-testid="content"
                styleOverrides={{ bg: 'azure' }}
              >
                Collapsible Content
              </Collapsible.Content>
            </Collapsible>
          )}
        </CollapsibleState>
      </ThemeProvider>
    )

    expect(getByTestId('collapsible')).toHaveStyleRule(
      'background-color',
      'azure'
    )
    expect(getByTestId('header')).toHaveStyleRule('background-color', 'azure')
    expect(getByTestId('content')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <CollapsibleState>
          {(state) => (
            <Collapsible state={state}>
              <Collapsible.Header label="Collapsible Label" />
              <Collapsible.Content>Collapsible Content</Collapsible.Content>
            </Collapsible>
          )}
        </CollapsibleState>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with nesting collapsibles', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <CollapsibleState>
          {(first) => (
            <Collapsible state={first}>
              <Collapsible.Header label="Collapsible Label" />
              <Collapsible.Content>
                <CollapsibleState>
                  {(second) => (
                    <Collapsible state={second}>
                      <Collapsible.Header label="Collapsible Label" />
                      <Collapsible.Content>
                        Collapsible Content
                      </Collapsible.Content>
                    </Collapsible>
                  )}
                </CollapsibleState>
              </Collapsible.Content>
            </Collapsible>
          )}
        </CollapsibleState>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
