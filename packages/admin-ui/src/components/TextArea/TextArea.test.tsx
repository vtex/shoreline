import React, { Fragment } from 'react'
import { render, axe } from '../../test-utils'

import { TextArea } from './index'

describe('TextArea tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <Fragment>
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          criticalText="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-area-1"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          criticalText="Error Message"
          value=""
          onChange={() => {}}
          tone="critical"
          label="Label"
          id="text-area-2"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          value=""
          onChange={() => {}}
          tone="critical"
          label="Label"
          disabled
          id="text-area-3"
        />
      </Fragment>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
