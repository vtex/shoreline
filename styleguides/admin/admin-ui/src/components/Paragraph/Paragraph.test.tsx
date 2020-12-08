import React from 'react'
import { render } from '@testing-library/react'

import { Paragraph } from './index'
import { ThemeProvider } from '../../system'

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
