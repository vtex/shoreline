import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { TextArea } from './index'
import { ThemeProvider } from '../../system'

describe('TextArea tests', () => {
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
        <TextArea
          data-testid="text-area"
          styleOverrides={{ backgroundColor: 'blue' }}
          state={{ value: '', onChange: () => {} }}
          label="TextArea label"
          id="text-area-1"
          helperText="Helper"
          charLimit={120}
        />
      </ThemeProvider>
    )

    expect(getByTestId('text-area')).toHaveStyleRule('background-color', 'blue')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <TextArea
          errorMessage="Error Message"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-area-1"
        />
        <TextArea
          helperText="Helper Text"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-area-2"
        />
        <TextArea
          charLimit={120}
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-area-3"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-area-4"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-area-5"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-area-6"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-area-7"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          disabled
          id="text-area-8"
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
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-area-1"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-area-2"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-area-3"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          id="text-area-4"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          state={{ value: '', onChange: () => {} }}
          label="Label"
          disabled
          id="text-area-5"
        />
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
