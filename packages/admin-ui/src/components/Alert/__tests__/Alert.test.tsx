import React, { Fragment } from 'react'
import { render, jestMatchMedia, axe } from '../../../test-utils'
import {
  IconErrorColorful,
  IconInfo,
  IconSuccessColorful,
  IconWarningColorful,
} from '@vtex/admin-ui-icons'

import { Alert } from '../index'

describe('Alert', () => {
  beforeEach(jestMatchMedia)

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Alert
        data-testid="alert"
        icon={<IconInfo />}
        visible
        csx={{ bg: 'coral' }}
      />
    )

    expect(getByTestId('alert')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Fragment>
        <Alert tone="positive" icon={<IconSuccessColorful />} visible>
          Order successfully placed
        </Alert>
        <Alert tone="warning" icon={<IconWarningColorful />} visible>
          This account is inactive. Check your billing for more information.
        </Alert>
        <Alert tone="critical" icon={<IconErrorColorful />} visible>
          Somenthing went wrong. Please, try again.
        </Alert>
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Fragment>
        <Alert tone="positive" icon={<IconSuccessColorful />} visible>
          Order successfully placed
        </Alert>
        <Alert tone="warning" icon={<IconWarningColorful />} visible>
          This account is inactive. Check your billing for more information.
        </Alert>
        <Alert tone="critical" icon={<IconErrorColorful />} visible>
          Somenthing went wrong. Please, try again.
        </Alert>
      </Fragment>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
