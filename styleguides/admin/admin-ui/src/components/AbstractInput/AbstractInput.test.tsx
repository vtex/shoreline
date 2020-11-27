import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { IconAdd } from '@vtex/admin-ui-icons'

import { AbstractInput } from './index'
import { ThemeProvider } from '../../system'

describe('AbstractInput tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <AbstractInput
          data-testid="input"
          styleOverrides={{ color: 'coral' }}
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
