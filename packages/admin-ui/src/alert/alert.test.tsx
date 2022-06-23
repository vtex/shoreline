import React, { Fragment } from 'react'
import { render, jestMatchMedia, axe } from '../test-utils'

import { Alert } from './index'

describe('Alert', () => {
  beforeEach(jestMatchMedia)

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Fragment>
        <Alert variant="positive">Order successfully placed</Alert>
        <Alert
          variant="critical"
          action={{ children: 'Click here', onClick: () => null }}
        >
          Somenthing went wrong. Please, try again.
        </Alert>
      </Fragment>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
