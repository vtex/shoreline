import React, { Fragment } from 'react'
import { render } from '../test-utils'

import { Divider } from './index'

describe('Heading tests', () => {
  it('renders', async () => {
    const { container } = render(
      <Fragment>
        <Divider />
        <Divider orientation="vertical" />
      </Fragment>
    )

    expect(container).toBeInTheDocument()
  })
})
