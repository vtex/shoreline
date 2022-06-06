import React from 'react'
import { render, axe } from '../../test-utils'
import { IconPlus } from '@vtex/phosphor-icons'

import { Input } from './index'

describe('Input tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <>
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
          criticalText="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-2"
        />
        <Input
          icon={<IconPlus />}
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
          icon={<IconPlus />}
          suffix="Kg"
          charLimit={120}
          helperText="Helper Text"
          criticalText="Error Message"
          value=""
          onChange={() => {}}
          onClear={() => {}}
          label="Label"
          id="text-field-4"
        />
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
