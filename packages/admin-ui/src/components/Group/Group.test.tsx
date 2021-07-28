import React from 'react'
import { render } from '@testing-library/react'
import type { BoxProps } from '@vtex/admin-primitives'
import { Box } from '@vtex/admin-primitives'
import { ThemeProvider } from '@vtex/admin-core'

import { Group, useGroup } from '.'

describe('Group tests', () => {
  function GroupAwareBox(props: BoxProps<'div'>) {
    const { grouped } = useGroup()

    return (
      <Box csx={{ height: grouped ? 100 : 200 }} {...props}>
        group aware box
      </Box>
    )
  }

  it('should provide a true grouped value', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Group>
          <GroupAwareBox data-testid="box" />
        </Group>
      </ThemeProvider>
    )

    expect(getByTestId('box')).toHaveStyleRule('height', '100px')
  })

  it('should provide a false grouped value', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Group grouped={false}>
          <GroupAwareBox data-testid="box" />
        </Group>
      </ThemeProvider>
    )

    expect(getByTestId('box')).toHaveStyleRule('height', '200px')
  })

  it('Group-aware components should not break if not wrapped by Group', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <GroupAwareBox data-testid="box" />
      </ThemeProvider>
    )

    expect(getByTestId('box')).toHaveStyleRule('height', '200px')
  })
})
