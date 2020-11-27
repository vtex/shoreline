import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { IconAdd } from '@vtex/admin-ui-icons'

import { InputPassword } from './index'
import { ThemeProvider } from '../../system'

describe('InputPassword tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <InputPassword
          data-testid="text-field"
          styleOverrides={{ backgroundColor: 'coral' }}
          value=""
          onChange={() => {}}
          label="TextField label"
          id="text-field-1"
          helperText="Helper"
          charLimit={120}
        />
      </ThemeProvider>
    )

    expect(getByTestId('text-field')).toHaveStyleRule(
      'background-color',
      'coral'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <InputPassword
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-1"
        />
        <InputPassword
          icon={<IconAdd />}
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-7"
        />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <InputPassword
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-1"
        />
        <InputPassword
          icon={<IconAdd />}
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-7"
        />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
