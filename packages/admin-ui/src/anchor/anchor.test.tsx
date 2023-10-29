import React, { Fragment } from 'react'
import { render } from '../test-utils'

import { Anchor } from './index'

describe('Anchor tests', () => {
  it('renders', async () => {
    const { container } = render(
      <Fragment>
        <Anchor href="/">Link 1</Anchor>
        <Anchor href="/">Link 2</Anchor>
        <Anchor href="/">Link 3</Anchor>
        <Anchor href="/">Link 4</Anchor>
      </Fragment>
    )

    expect(container).toBeInTheDocument()
  })
})
