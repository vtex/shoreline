import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Pagination } from '../pagination'

describe('pagination', () => {
  test('renders', () => {
    const { container } = render(<Pagination page={1} total={50} />)

    expect(container.querySelector('[data-sl-pagination]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-actions]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-label]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-label]')
    ).toBeInTheDocument()
  })

  test('action prev should be disabled on the first page', () => {
    const { container } = render(<Pagination page={1} total={50} />)

    expect(
      container.querySelector('[data-sl-pagination-actions]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-action-prev]')
    ).toBeDisabled()
  })

  test('action next should be disabled on the last page', () => {
    const { container } = render(<Pagination page={2} total={50} />)

    expect(
      container.querySelector('[data-sl-pagination-actions]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-action-next]')
    ).toBeDisabled()
  })

  test('pagination label should show min between size and the total number of items', () => {
    const { container, getByText } = render(<Pagination page={3} total={55} />)

    expect(
      container.querySelector('[data-sl-pagination-label]')
    ).toBeInTheDocument()

    expect(getByText('50 - 55 of 55')).toBeTruthy()
  })

  test('pagination label should show 0 items when the total of items is 0', () => {
    const { container, getByText } = render(<Pagination page={1} total={0} />)

    expect(
      container.querySelector('[data-sl-pagination-label]')
    ).toBeInTheDocument()

    expect(getByText('0 - 0 of 0')).toBeTruthy()
  })
})
