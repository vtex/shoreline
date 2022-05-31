import React from 'react'
import { render, axe } from '../../test-utils'
import { IconPlus } from '@vtex/phosphor-icons'

import { InputPassword } from './index'

describe('InputPassword tests', () => {
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
          icon={<IconPlus />}
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
