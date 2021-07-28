import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { ThemeProvider } from '@vtex/admin-core'
import {
  IconErrorColorful,
  IconInfo,
  IconSuccessColorful,
  IconWarningColorful,
} from '@vtex/admin-ui-icons'

import { Alert } from './index'

describe('Alert tests', () => {
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
        <Alert
          data-testid="alert"
          icon={<IconInfo />}
          visible
          csx={{ bg: 'coral' }}
        />
      </ThemeProvider>
    )

    expect(getByTestId('alert')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Alert type="success" icon={<IconSuccessColorful />} visible>
          Order successfully placed
        </Alert>
        <Alert type="warning" icon={<IconWarningColorful />} visible>
          This account is inactive. Check your billing for more information.
        </Alert>
        <Alert type="error" icon={<IconErrorColorful />} visible>
          Somenthing went wrong. Please, try again.
        </Alert>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Alert type="success" icon={<IconSuccessColorful />} visible>
          Order successfully placed
        </Alert>
        <Alert type="warning" icon={<IconWarningColorful />} visible>
          This account is inactive. Check your billing for more information.
        </Alert>
        <Alert type="error" icon={<IconErrorColorful />} visible>
          Somenthing went wrong. Please, try again.
        </Alert>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
