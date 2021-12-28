import React from 'react'
import { render, axe } from '../../test-utils'
import { IconPlus } from '@vtex/phosphor-icons'

import { Input } from './index'

describe('Input tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Input
        data-testid="text-field"
        csx={{ bg: 'coral' }}
        value=""
        onChange={() => {}}
        label="TextField label"
        id="text-field-1"
        helperText="Helper"
        charLimit={120}
        readOnly
      />
    )

    expect(getByTestId('text-field')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <Input
          criticalText="Error Message"
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
          criticalText="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-field-5"
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
          id="text-field-6"
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
          id="text-field-7"
        />
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

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
