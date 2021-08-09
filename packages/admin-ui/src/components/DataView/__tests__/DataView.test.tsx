import React from 'react'

import { render, withState, axe } from '../../../test-utils'
import { DataView } from '../components/DataView'
import { useDataViewState } from '../state'

const StatefulDataView = withState(DataView, () => useDataViewState())

describe('DataView', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <StatefulDataView data-testid="data-view" csx={{ bg: 'coral' }}>
        DataView
      </StatefulDataView>
    )

    expect(getByTestId('data-view')).toHaveStyleRule(
      'background-color',
      'coral'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<StatefulDataView>DataView</StatefulDataView>)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(<StatefulDataView>DataView</StatefulDataView>)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
