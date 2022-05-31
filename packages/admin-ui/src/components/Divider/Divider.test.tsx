import React, { Fragment } from 'react'
import { render, axe } from '../../test-utils'

import { Divider } from './index'

describe('Heading tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <Fragment>
        <Divider />
        <Divider orientation="vertical" />
      </Fragment>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
