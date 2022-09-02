import React from 'react'

import { render, withState, axe } from '../../test-utils'
import { DataView } from '../components/data-view'
import { useDataViewState } from '../data-view.state'

const StatefulDataView = withState(DataView, () => useDataViewState())

describe('DataView', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(<StatefulDataView>DataView</StatefulDataView>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
