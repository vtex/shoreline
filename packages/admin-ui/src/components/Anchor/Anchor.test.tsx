import React, { Fragment } from 'react'
import { render, axe } from '../../test-utils'

import { Anchor } from './index'

describe('Anchor tests', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Fragment>
        <Anchor href="/">Link 1</Anchor>
        <Anchor href="/">Link 2</Anchor>
        <Anchor href="/">Link 3</Anchor>
        <Anchor href="/">Link 4</Anchor>
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Fragment>
        <Anchor href="/">Link 1</Anchor>
        <Anchor href="/">Link 2</Anchor>
        <Anchor href="/">Link 3</Anchor>
        <Anchor href="/">Link 4</Anchor>
      </Fragment>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
