import React, { PropsWithChildren } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import serializer from 'jest-emotion'

import { ThemeProvider } from '../../theme'
import { Collapsible, useCollapsible } from './index'

expect.addSnapshotSerializer(serializer)

function StatefulCollpasible({ children }: PropsWithChildren<{}>) {
  const state = useCollapsible()

  return <Collapsible {...state}>{children}</Collapsible>
}

describe('Button tests', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <StatefulCollpasible>
          <Collapsible.Header label="Label" />
          <Collapsible.Content>Content</Collapsible.Content>
        </StatefulCollpasible>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
