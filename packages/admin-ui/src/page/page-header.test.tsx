import type { ReactNode } from 'react'
import React from 'react'
import { render } from '../test-utils'
import {
  PageHeader,
  PageHeaderTop,
  PageHeaderTitle,
  PageHeaderTags,
  PageHeaderTag,
  PageHeaderActions,
  PageHeaderButton,
  PageHeaderBottom,
} from './index'
import type { TabState } from '../tab'
import { useTabState, TabList, Tab } from '../tab'

import 'intersection-observer'

interface Props {
  tags?: ReactNode
  actions?: ReactNode
  bottom?: ReactNode
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

const bottom = (state: TabState) => (
  <PageHeaderBottom>
    <TabList state={state}>
      <Tab id="1">Label</Tab>
      <Tab id="2">Label</Tab>
      <Tab id="3">Label</Tab>
    </TabList>
  </PageHeaderBottom>
)

function Basic(props: Props) {
  const {
    tags = null,
    actions = null,
    onPopNavigation: onPopNavProp = false,
    bottom = null,
  } = props

  const onPopNavigation = onPopNavProp ? () => null : undefined

  return (
    <PageHeader onPopNavigation={onPopNavigation}>
      <PageHeaderTop>
        <PageHeaderTitle>Product #123 {tags}</PageHeaderTitle>
        {actions}
      </PageHeaderTop>
      {bottom}
    </PageHeader>
  )
}

describe('page-header', () => {
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
    const { getAllByRole } = render(<Basic actions={actions} />)

    const results = getAllByRole('button')

    expect(results).toHaveLength(2)

    const expects = ['Edit', 'Create']

    results.forEach((result, index) =>
      expect(result).toHaveTextContent(expects[index])
    )
  })

  it("page-header's tabs should be visible", () => {
    const Test = () => {
      const state = useTabState()

      return <Basic bottom={bottom(state)} />
    }

    const { getAllByText } = render(<Test />)

    const results = getAllByText('Label')

    expect(results).toHaveLength(3)

    results.forEach((result) => {
      expect(result).toBeVisible()
    })
  })
})
