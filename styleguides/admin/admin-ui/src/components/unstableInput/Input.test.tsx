import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { IconAdd } from '@vtex/admin-ui-icons'

import { unstableInput as Input } from './index'
import { ThemeProvider } from '../../system'

describe('Input tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Input
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
        <Input value="Test1" readOnly />
        <Input onClear={() => {}} />
        <Input onClear={() => {}} value="Test2" readOnly />
        <Input icon={<IconAdd />} />
        <Input icon={<IconAdd />} value="Test3" readOnly />
        <Input icon={<IconAdd />} onClear={() => {}} />
        <Input icon={<IconAdd />} onClear={() => {}} value="Test4" readOnly />
        <Input suffix="Kg" />
        <Input suffix="Kg" value="Test5" readOnly />
        <Input suffix="Kg" onClear={() => {}} />
        <Input suffix="Kg" icon={<IconAdd />} />
        <Input suffix="Kg" icon={<IconAdd />} onClear={() => {}} />
        <Input
          suffix="Kg"
          icon={<IconAdd />}
          onClear={() => {}}
          value="Test6"
          readOnly
        />
        <Input onClear={() => {}} value="Test7" id="password" type="password" />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Input aria-label="raw-input" />
        <Input value="Test1" aria-label="input-value" readOnly />
        <Input onClear={() => {}} aria-label="input-clear" />
        <Input
          onClear={() => {}}
          value="Test2"
          aria-label="input-clear-value"
          readOnly
        />
        <Input icon={<IconAdd />} aria-label="input-icon" />
        <Input
          icon={<IconAdd />}
          value="Test3"
          aria-label="input-icon-value"
          readOnly
        />
        <Input
          icon={<IconAdd />}
          onClear={() => {}}
          aria-label="input-icon-clear"
        />
        <Input
          icon={<IconAdd />}
          onClear={() => {}}
          value="Test4"
          aria-label="input-icon-clear-value"
          readOnly
        />
        <Input suffix="Kg" aria-label="input-suffix" />
        <Input
          suffix="Kg"
          aria-label="input-suffix-value"
          value="Test5"
          readOnly
        />
        <Input suffix="Kg" onClear={() => {}} aria-label="input-suffix-clear" />
        <Input suffix="Kg" icon={<IconAdd />} aria-label="input-suffix-icon" />
        <Input
          suffix="Kg"
          icon={<IconAdd />}
          onClear={() => {}}
          aria-label="input-suffix-icon-clear"
        />
        <Input
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
