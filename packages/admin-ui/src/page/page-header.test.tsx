import type { ReactNode } from 'react'
import React from 'react'
import { render, axe } from '../test-utils'
import {
  PageHeader,
  PageHeaderTop,
  PageHeaderTitle,
  PageHeaderTags,
  PageHeaderTag,
  PageHeaderActions,
  PageHeaderButton,
} from './index'

import 'intersection-observer'

interface Props {
  tags?: ReactNode
  actions?: ReactNode
  onPopNavigation?: boolean
}

const tags = (
  <PageHeaderTags>
    <PageHeaderTag label="Short text" />
  </PageHeaderTags>
)

const actions = (
  <PageHeaderActions>
    <PageHeaderButton variant="secondary">Edit</PageHeaderButton>
    <PageHeaderButton>Create</PageHeaderButton>
  </PageHeaderActions>
)

function Basic(props: Props) {
  const {
    tags = null,
    actions = null,
    onPopNavigation: onPopNavProp = false,
  } = props

  const onPopNavigation = onPopNavProp ? () => null : undefined

  return (
    <PageHeader onPopNavigation={onPopNavigation}>
      <PageHeaderTop>
        <PageHeaderTitle>Product #123 {tags}</PageHeaderTitle>
        {actions}
      </PageHeaderTop>
    </PageHeader>
  )
}

describe('page-header', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <Basic tags={tags} actions={actions} onPopNavigation />
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })

  it('page-header onPopNavigation should be visible', () => {
    const { queryByRole } = render(<Basic onPopNavigation />)

    const results = queryByRole('button')

    expect(results).toBeTruthy()
  })

  it('page-header title should be visible', async () => {
    const { findByText } = render(<Basic />)

    const results = await findByText('Product #123')

    expect(results).toBeVisible()
  })

  it("page-header's tag should be visible", async () => {
    const { findByText } = render(<Basic tags={tags} />)

    const results = await findByText('Short text')

    expect(results).toBeVisible()
  })

  it("page-header's actions should be visible", async () => {
    const { queryAllByRole } = render(<Basic actions={actions} />)

    const results = queryAllByRole('button')

    expect(results).toHaveLength(2)

    const expects = ['Edit', 'Create']

    results.forEach((result, index) =>
      expect(result).toHaveTextContent(expects[index])
    )
  })
})
