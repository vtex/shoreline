import React from 'react'

import { render, axe, jestMatchMedia } from '../../test-utils'
import { Stack } from '../index'

describe('Stack', () => {
  beforeEach(jestMatchMedia)

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Stack data-testid="stack" csx={{ bg: 'coral' }}>
        <button>element 1</button>
        <button>element 2</button>
      </Stack>
    )

    expect(getByTestId('stack')).toHaveStyleRule('background', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <Stack>
          <button>element 1</button>
          <button>element 2</button>
        </Stack>
        <Stack align="end">
          <button>element 1</button>
          <button>element 2</button>
        </Stack>
        <Stack direction="row">
          <button>element 1</button>
          <button>element 2</button>
        </Stack>
        <Stack direction="row" fluid>
          <button>element 1</button>
          <button>element 2</button>
        </Stack>
        <Stack direction="row" fluid align="end">
          <button>element 1</button>
          <button>element 2</button>
        </Stack>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Stack>
        <button>element 1</button>
        <button>element 2</button>
      </Stack>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
