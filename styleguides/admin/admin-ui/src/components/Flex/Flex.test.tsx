import React from 'react'
import { render } from '@testing-library/react'

import { Flex } from './index'
import { ThemeProvider } from '@vtex/admin-core'

describe('Flex tests', () => {
  it('should apply styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Flex data-testid="flex" styles={{ bg: 'coral' }}>
          Flex
        </Flex>
      </ThemeProvider>
    )

    expect(getByTestId('flex')).toHaveStyleRule('background-color', 'coral')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
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
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
