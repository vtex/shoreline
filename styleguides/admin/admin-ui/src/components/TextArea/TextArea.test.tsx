import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { TextArea } from './index'
import { ThemeProvider } from '../../system'

describe('TextArea tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TextArea
          data-testid="text-area"
          styleOverrides={{ backgroundColor: 'blue' }}
          value=""
          onChange={() => {}}
          label="TextArea label"
          id="text-area-1"
          helperText="Helper"
          charLimit={120}
        />
      </ThemeProvider>
    )

    expect(getByTestId('text-area')).toHaveStyleRule(
      'background-color',
      '#DAE3F5'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <TextArea
          helperText="Helper Text"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-area-1"
        />
        <TextArea
          charLimit={120}
          value=""
          onChange={() => {}}
          label="Label"
          id="text-area-2"
        />
        <TextArea
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          error
          label="Label"
          id="text-area-3"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-area-4"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          error
          label="Label"
          id="text-area-5"
        />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-area-1"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          error
          label="Label"
          id="text-area-2"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          value=""
          onChange={() => {}}
          error
          label="Label"
          disabled
          id="text-area-3"
        />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
