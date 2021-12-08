import React from 'react'
import { render, axe } from '../../test-utils'

import { Skeleton } from './index'

describe('Skeleton tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Skeleton data-testid="skeleton" csx={{ bg: 'coral' }} />
    )

    expect(getByTestId('skeleton')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <Skeleton />
        <Skeleton shape="circle" />
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<Skeleton />)

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
