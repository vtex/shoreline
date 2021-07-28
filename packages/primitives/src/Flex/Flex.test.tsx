import React, { Fragment } from 'react'

import { render } from '../test-utils'
import { Flex } from './index'

describe('Flex tests', () => {
  it('should apply csx', () => {
    const { getByTestId } = render(
      <Flex data-testid="flex" csx={{ bg: 'coral' }}>
        Flex
      </Flex>
    )

    expect(getByTestId('flex')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Fragment>
        <Flex justify="stretch" />
        <Flex align="baseline" />
        <Flex basis="max-content" />
        <Flex direction="column" />
        <Flex wrap="wrap" />
        <Flex grow={1} />
        <Flex shrink={1} />
        <Flex order={999} />
        <Flex>
          <Flex.Spacer />
        </Flex>
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
