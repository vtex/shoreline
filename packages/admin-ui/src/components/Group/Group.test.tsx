import React from 'react'
import { render } from '../../test-utils'
import type { BoxProps } from '@vtex/admin-primitives'
import { Box } from '@vtex/admin-primitives'

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
      <Group>
        <GroupAwareBox data-testid="box" />
      </Group>
    )

    expect(getByTestId('box')).toHaveStyleRule('height', '100px')
  })

  it('should provide a false grouped value', () => {
    const { getByTestId } = render(
      <Group grouped={false}>
        <GroupAwareBox data-testid="box" />
      </Group>
    )

    expect(getByTestId('box')).toHaveStyleRule('height', '200px')
  })

  it('Group-aware components should not break if not wrapped by Group', () => {
    const { getByTestId } = render(<GroupAwareBox data-testid="box" />)

    expect(getByTestId('box')).toHaveStyleRule('height', '200px')
  })
})
