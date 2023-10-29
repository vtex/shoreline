import React from 'react'

import { render, withState } from '../../test-utils'
import { DataView, DataViewHeader, DataViewActions } from '../index'
import { useDataViewState } from '../data-view.state'

const StatefulDataView = withState(DataView, () => useDataViewState())

describe('DataView', () => {
  it('renders', async () => {
    const { container } = render(
      <StatefulDataView>
        <DataViewHeader>
          <div>
            Header
            <DataViewActions>
              <button>action</button>
            </DataViewActions>
          </div>
        </DataViewHeader>
        DataView
      </StatefulDataView>
    )

    expect(container).toBeInTheDocument()
  })
})
