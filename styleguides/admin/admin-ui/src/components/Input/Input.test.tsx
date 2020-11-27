import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { IconAdd } from '@vtex/admin-ui-icons'

import { Input } from './index'
import { ThemeProvider } from '../../system'

describe('Input tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Input
          data-testid="text-field"
          styleOverrides={{ backgroundColor: 'coral' }}
          value=""
          onChange={() => {}}
          label="TextField label"
          id="text-field-1"
          helperText="Helper"
          charLimit={120}
          readOnly
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
        <Input
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-1"
        />
        <Input
          helperText="Helper Text"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-2"
        />
        <Input
          charLimit={120}
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-3"
        />
        <Input
          charLimit={120}
          helperText="Helper Text"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-4"
        />
        <Input
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-5"
        />
        <Input
          icon={<IconAdd />}
          suffix="Kg"
          charLimit={120}
          helperText="Helper Text"
          value=""
          onChange={() => {}}
          onClear={() => {}}
          label="Label"
          id="text-field-6"
        />
        <Input
          icon={<IconAdd />}
          suffix="Kg"
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          onClear={() => {}}
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
        <Input
          charLimit={120}
          helperText="Helper Text"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-1"
        />
        <Input
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-2"
        />
        <Input
          icon={<IconAdd />}
          suffix="Kg"
          charLimit={120}
          helperText="Helper Text"
          value=""
          onChange={() => {}}
          onClear={() => {}}
          label="Label"
          id="text-field-3"
        />
        <Input
          icon={<IconAdd />}
          suffix="Kg"
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          onClear={() => {}}
          label="Label"
          id="text-field-4"
        />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
