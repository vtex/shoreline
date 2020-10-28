import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import serializer, { matchers } from 'jest-emotion'

import { Paragraph } from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

expect.addSnapshotSerializer(serializer)
expect.extend(matchers)

describe('Paragraph tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Paragraph data-testid="paragraph" styleOverrides={{ bg: 'azure' }}>
          test paragraph
        </Paragraph>
      </ThemeProvider>
    )

    expect(getByTestId('paragraph')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Paragraph>test paragraph</Paragraph>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
