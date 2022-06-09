import React, { Fragment } from 'react'
import { render, jestMatchMedia, axe } from '../test-utils'

import { Alert } from './index'

describe('Alert', () => {
  beforeEach(jestMatchMedia)

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Fragment>
        <Alert tone="positive" visible>
          Order successfully placed
        </Alert>
        <Alert
          tone="critical"
          visible
          action={{ children: 'Click here', onClick: () => null }}
        >
          Somenthing went wrong. Please, try again.
        </Alert>
        <Alert>I'm invisible</Alert>
      </Fragment>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
