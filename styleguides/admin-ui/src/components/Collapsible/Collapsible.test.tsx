import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import serializer from 'jest-emotion'

import { ThemeProvider } from '../../theme'
import { Collapsible } from './index'

expect.addSnapshotSerializer(serializer)

describe('Collapsible tests', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Collapsible toggle={() => {}} baseId="">
          <Collapsible.Header label="Label" />
          <Collapsible.Content>Content</Collapsible.Content>
        </Collapsible>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
