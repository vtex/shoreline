import React from 'react'
import { render, axe } from '../../test-utils'
import { IconAdd } from '@vtex/admin-ui-icons'

import { InputPassword } from './index'

describe('InputPassword tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <InputPassword
        data-testid="text-field"
        csx={{ bg: 'coral' }}
        value=""
        onChange={() => {}}
        label="TextField label"
        id="text-field-1"
        helperText="Helper"
        charLimit={120}
      />
    )

    expect(getByTestId('text-field')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <InputPassword
          criticalText="Error Message"
          tone="critical"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-1"
        />
        <InputPassword
          icon={<IconAdd />}
          charLimit={120}
          helperText="Helper Text"
          criticalText="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-7"
        />
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <>
        <InputPassword
          criticalText="Error Message"
          tone="critical"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-1"
        />
        <InputPassword
          icon={<IconAdd />}
          charLimit={120}
          helperText="Helper Text"
          criticalText="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-7"
        />
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
