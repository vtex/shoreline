import React from 'react'

import { render, withState } from '../../../test-utils'
import { DataView } from '../components/DataView'
import { DataViewStatus } from '../components/DataViewStatus'
import { useDataViewState } from '../state'

const StatefulDataView = withState(DataView, () => useDataViewState())

const StatefulDataViewLoading = withState(DataView, () =>
  useDataViewState({
    loading: true,
    error: null,
    empty: null,
    notFound: null,
  })
)

const StatefulDataViewError = withState(DataView, () =>
  useDataViewState({
    loading: false,
    error: {
      message: 'error',
      action: {
        text: 'error',
        onClick: () => null,
      },
    },
    empty: null,
    notFound: null,
  })
)

const StatefulDataViewNotFound = withState(DataView, () =>
  useDataViewState({
    loading: false,
    error: null,
    empty: null,
    notFound: {
      message: 'not found',
      suggestion: 'not found',
    },
  })
)

const StatefulDataViewEmpty = withState(DataView, () =>
  useDataViewState({
    loading: false,
    error: null,
    empty: {
      message: 'empty',
      action: {
        text: 'empty',
        onClick: () => null,
      },
    },
    notFound: null,
  })
)

describe('DataViewStatus', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <StatefulDataView>
        <DataViewStatus />
      </StatefulDataView>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot loading', () => {
    const { asFragment } = render(
      <StatefulDataViewLoading>
        <DataViewStatus />
      </StatefulDataViewLoading>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot error', () => {
    const { asFragment } = render(
      <StatefulDataViewError>
        <DataViewStatus />
      </StatefulDataViewError>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot empty', () => {
    const { asFragment } = render(
      <StatefulDataViewEmpty>
        <DataViewStatus />
      </StatefulDataViewEmpty>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snapshot not-found', () => {
    const { asFragment } = render(
      <StatefulDataViewNotFound>
        <DataViewStatus />
      </StatefulDataViewNotFound>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
