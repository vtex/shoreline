import React, { Fragment } from 'react'
import { render, axe, jestMatchMedia } from '../../test-utils'

import { Columns } from './index'
import { ColumnsItem } from './Item'

describe('Columns tests', () => {
  beforeEach(jestMatchMedia)

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Columns data-testid="columns" csx={{ bg: 'coral' }}>
        <ColumnsItem data-testid="item" csx={{ bg: 'azure' }}>
          <button>element 1</button>
        </ColumnsItem>
        <Columns.Item>
          <button>element 2</button>
        </Columns.Item>
      </Columns>
    )

    // TODO: Check why types are not working
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getByTestId('columns')).toHaveStyleRule('background-color', 'coral')
    // TODO: Check why types are not working
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(getByTestId('item')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Fragment>
        <Columns>
          <ColumnsItem>
            <button>element 1</button>
          </ColumnsItem>
          <Columns.Item>
            <button>element 2</button>
          </Columns.Item>
        </Columns>
        <Columns>
          <ColumnsItem units={4}>
            <button>element 1</button>
          </ColumnsItem>
          <Columns.Item units={4} offset="right">
            <button>element 2</button>
          </Columns.Item>
        </Columns>
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Columns>
        <ColumnsItem>
          <button>element 1</button>
        </ColumnsItem>
        <Columns.Item>
          <button>element 2</button>
        </Columns.Item>
      </Columns>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
