import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { IconAdd } from '@vtex/admin-ui-icons'

import { TextField } from './index'
import { ThemeProvider } from '../../system'

describe('Input tests', () => {
  beforeEach(() => {
    /**
     * 🚧 Workaround for window.match media
     * @see https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
     */
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TextField
          data-testid="text-field"
          styleOverrides={{ backgroundColor: 'coral' }}
          state={{ value: '', onChange: () => {} }}
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
        <TextField
          errorMessage="Error Message"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-field-1"
        />
        <TextField
          helperText="Helper Text"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-field-2"
        />
        <TextField
          charLimit={120}
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-field-3"
        />
        <TextField
          charLimit={120}
          helperText="Helper Text"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-field-4"
        />
        <TextField
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-field-5"
        />
        <TextField
          icon={<IconAdd />}
          suffix="Kg"
          charLimit={120}
          helperText="Helper Text"
          state={{ value: '', onChange: () => {}, onClear: () => {} }}
          label="Label"
          id="text-field-6"
        />
        <TextField
          icon={<IconAdd />}
          suffix="Kg"
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          state={{ value: '', onChange: () => {}, onClear: () => {} }}
          label="Label"
          id="text-field-7"
        />
        <TextField
          state={{ value: '', onChange: () => {}, onClear: () => {} }}
          id="text-field-8"
          type="password"
          label="Password"
          helperText="Helper Text"
          charLimit={120}
        />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <TextField
          charLimit={120}
          helperText="Helper Text"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-field-1"
        />
        <TextField
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-field-2"
        />
        <TextField
          icon={<IconAdd />}
          suffix="Kg"
          charLimit={120}
          helperText="Helper Text"
          state={{ value: '', onChange: () => {}, onClear: () => {} }}
          label="Label"
          id="text-field-3"
        />
        <TextField
          icon={<IconAdd />}
          suffix="Kg"
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          state={{ value: '', onChange: () => {}, onClear: () => {} }}
          label="Label"
          id="text-field-4"
        />
        <TextField
          state={{ value: '', onChange: () => {}, onClear: () => {} }}
          id="text-field-5"
          type="password"
          label="Password"
          helperText="Helper Text"
          charLimit={120}
        />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
