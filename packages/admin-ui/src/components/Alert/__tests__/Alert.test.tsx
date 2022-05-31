import React, { Fragment } from 'react'
import { render, jestMatchMedia, axe } from '../../../test-utils'
import { IconXCircle, IconCheckCircle, IconWarning } from '@vtex/phosphor-icons'

import { Alert } from '../index'

describe('Alert', () => {
  beforeEach(jestMatchMedia)

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Fragment>
        <Alert tone="positive" icon={<IconCheckCircle />} visible>
          Order successfully placed
        </Alert>
        <Alert tone="warning" icon={<IconWarning />} visible>
          This account is inactive. Check your billing for more information.
        </Alert>
        <Alert tone="critical" icon={<IconXCircle />} visible>
          Somenthing went wrong. Please, try again.
        </Alert>
      </Fragment>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
