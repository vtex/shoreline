import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import serializer from 'jest-emotion'

import { ThemeProvider } from '../../theme'
import { Card } from './index'

expect.addSnapshotSerializer(serializer)

describe('Button tests', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Card>Example card</Card>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
