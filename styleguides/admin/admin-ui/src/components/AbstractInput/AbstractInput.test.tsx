import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { axe } from 'jest-axe'
import { IconAdd } from '@vtex/admin-ui-icons'

import { AbstractInput, AbstractInputPassword } from './index'
import { ThemeProvider } from '@vtex/admin-core'

describe('AbstractInput tests', () => {
  describe('Text', () => {
    it('should have overridable styles', () => {
      const { getByTestId } = render(
        <ThemeProvider>
          <AbstractInput
            data-testid="input"
            csx={{ color: 'coral' }}
            value="Test1"
            readOnly
          />
        </ThemeProvider>
      )

      expect(getByTestId('input')).toHaveStyleRule('color', 'coral')
    })

    it('should match snapshot', () => {
      const { asFragment } = render(
        <ThemeProvider>
          <AbstractInput value="Test1" readOnly />
          <AbstractInput onClear={() => {}} />
          <AbstractInput onClear={() => {}} value="Test2" readOnly />
          <AbstractInput icon={<IconAdd />} />
          <AbstractInput icon={<IconAdd />} value="Test3" readOnly />
          <AbstractInput icon={<IconAdd />} onClear={() => {}} />
          <AbstractInput
            icon={<IconAdd />}
            onClear={() => {}}
            value="Test4"
            readOnly
          />
          <AbstractInput suffix="Kg" />
          <AbstractInput suffix="Kg" value="Test5" readOnly />
          <AbstractInput suffix="Kg" onClear={() => {}} />
          <AbstractInput suffix="Kg" icon={<IconAdd />} />
          <AbstractInput suffix="Kg" icon={<IconAdd />} onClear={() => {}} />
          <AbstractInput
            suffix="Kg"
            icon={<IconAdd />}
            onClear={() => {}}
            value="Test6"
            readOnly
          />
        </ThemeProvider>
      )

      expect(asFragment()).toMatchSnapshot()
    })

    it('should not have a11y violations', async () => {
      const { container } = render(
        <ThemeProvider>
          <AbstractInput aria-label="raw-input" />
          <AbstractInput value="Test1" aria-label="input-value" readOnly />
          <AbstractInput onClear={() => {}} aria-label="input-clear" />
          <AbstractInput
            onClear={() => {}}
            value="Test2"
            aria-label="input-clear-value"
            readOnly
          />
          <AbstractInput icon={<IconAdd />} aria-label="input-icon" />
          <AbstractInput
            icon={<IconAdd />}
            value="Test3"
            aria-label="input-icon-value"
            readOnly
          />
          <AbstractInput
            icon={<IconAdd />}
            onClear={() => {}}
            aria-label="input-icon-clear"
          />
          <AbstractInput
            icon={<IconAdd />}
            onClear={() => {}}
            value="Test4"
            aria-label="input-icon-clear-value"
            readOnly
          />
          <AbstractInput suffix="Kg" aria-label="input-suffix" />
          <AbstractInput
            suffix="Kg"
            aria-label="input-suffix-value"
            value="Test5"
            readOnly
          />
          <AbstractInput
            suffix="Kg"
            onClear={() => {}}
            aria-label="input-suffix-clear"
          />
          <AbstractInput
            suffix="Kg"
            icon={<IconAdd />}
            aria-label="input-suffix-icon"
          />
          <AbstractInput
            suffix="Kg"
            icon={<IconAdd />}
            onClear={() => {}}
            aria-label="input-suffix-icon-clear"
          />
          <AbstractInput
            suffix="Kg"
            icon={<IconAdd />}
            onClear={() => {}}
            value="Test6"
            aria-label="input-suffix-icon-clear-value"
            readOnly
          />
        </ThemeProvider>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
  describe('Password', () => {
    it('should be able to show & hide the password', () => {
      const { getByRole, getByTestId } = render(
        <ThemeProvider>
          <AbstractInputPassword
            data-testid="input-password"
            csx={{ color: 'coral' }}
            value="Test1"
            readOnly
          />
        </ThemeProvider>
      )

      const input = () => getByTestId('input-password')
      const revealButton = () => getByRole('button')
      const clickButton = () => fireEvent.click(revealButton())

      expect(input()).toBeInTheDocument()
      expect(revealButton()).toBeInTheDocument()

      // hidden
      expect(input()).toHaveAttribute('type', 'password')

      // shown
      clickButton()
      expect(input()).toHaveAttribute('type', 'text')

      // hidden
      clickButton()
      expect(input()).toHaveAttribute('type', 'password')
    })

    it('should match snaphost', () => {
      const { asFragment } = render(
        <ThemeProvider>
          <AbstractInputPassword value="" id="password" readOnly />
          <AbstractInputPassword
            value=""
            id="password"
            readOnly
            icon={<IconAdd />}
          />
        </ThemeProvider>
      )

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
