import React, { Fragment } from 'react'

import { Divider } from './index'
import { render, axe } from '../../test-utils'

describe('Divider tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Divider data-testid="divider" csx={{ bg: 'azure' }} />
    )

    expect(getByTestId('divider')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Fragment>
        <Divider />
        <Divider orientation="vertical" />
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })

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
