import React from 'react'
import { render, axe } from '../../test-utils'

import { Heading } from './index'

describe('Heading tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Heading data-testid="heading" csx={{ color: 'azure' }}>
        Heading 1
      </Heading>
    )

    expect(getByTestId('heading')).toHaveStyleRule('color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <Heading>Heading 1</Heading>
        <Heading element="h2">Heading 2</Heading>
        <Heading element="h3">Heading 3</Heading>
        <Heading element="h4">Heading 4</Heading>
        <Heading element="h5">Heading 5</Heading>
        <Heading element="h6">Heading 6</Heading>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <>
        <Heading>Heading 1</Heading>
        <Heading element="h2">Heading 2</Heading>
        <Heading element="h3">Heading 3</Heading>
        <Heading element="h4">Heading 4</Heading>
        <Heading element="h5">Heading 5</Heading>
        <Heading element="h6">Heading 6</Heading>
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
