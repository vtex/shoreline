import React, { Fragment } from 'react'
import { render, axe, jestMatchMedia } from '../../../test-utils'

import { Columns, Column } from '../index'

describe('Columns', () => {
  beforeEach(jestMatchMedia)

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Columns data-testid="columns" csx={{ bg: 'coral' }}>
        <Column data-testid="item" csx={{ bg: 'azure' }}>
          <button>element 1</button>
        </Column>
        <Column>
          <button>element 2</button>
        </Column>
      </Columns>
    )

    expect(getByTestId('columns')).toHaveStyleRule('background', 'coral')
    expect(getByTestId('item')).toHaveStyleRule('background', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Fragment>
        <Columns>
          <Column>
            <button>element 1</button>
          </Column>
          <Column>
            <button>element 2</button>
          </Column>
        </Columns>
        <Columns>
          <Column units={4}>
            <button>element 1</button>
          </Column>
          <Column units={4} offset="right">
            <button>element 2</button>
          </Column>
        </Columns>
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Columns>
        <Column>
          <button>element 1</button>
        </Column>
        <Column>
          <button>element 2</button>
        </Column>
      </Columns>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
