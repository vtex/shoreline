import React from 'react'
import { render } from '../../test-utils'

import type { DisclosureStateReturn } from './index'
import { Collapsible, useCollapsible } from './index'

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
      <CollapsibleState>
        {(state) => (
          <Collapsible
            state={state}
            data-testid="collapsible"
            csx={{ bg: 'azure' }}
          >
            <Collapsible.Header
              label="Collapsible Label"
              data-testid="header"
              csx={{ bg: 'azure' }}
            />
            <Collapsible.Content data-testid="content" csx={{ bg: 'azure' }}>
              Collapsible Content
            </Collapsible.Content>
          </Collapsible>
        )}
      </CollapsibleState>
    )

    // TODO: Check why types are not working
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getByTestId('collapsible')).toHaveStyleRule(
      'background-color',
      'azure'
    )
    // TODO: Check why types are not working
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getByTestId('header')).toHaveStyleRule('background-color', 'azure')
    // TODO: Check why types are not working
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getByTestId('content')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <CollapsibleState>
        {(state) => (
          <Collapsible state={state}>
            <Collapsible.Header label="Collapsible Label" />
            <Collapsible.Content>Collapsible Content</Collapsible.Content>
          </Collapsible>
        )}
      </CollapsibleState>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot with nesting collapsibles', () => {
    const { asFragment } = render(
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
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
