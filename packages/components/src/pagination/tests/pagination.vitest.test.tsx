import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Pagination } from '../pagination'

describe('pagination', () => {
  test('renders', () => {
    const { container } = render(
      <Pagination page={1} total={50} size={25} sizeOptions={[25, 50, 100]} />
    )

    expect(container.querySelector('[data-sl-pagination]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-size-select]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-actions]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-page-select]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-total-label]')
    ).toBeInTheDocument()
  })

  test('should not render page size selector', () => {
    const { container } = render(<Pagination page={1} total={50} size={25} />)

    expect(container.querySelector('[data-sl-pagination]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-size-select]')
    ).not.toBeInTheDocument()
  })

  test('action prev should be disabled on the first page', () => {
    const { container } = render(
      <Pagination page={1} total={50} size={25} sizeOptions={[25, 50, 100]} />
    )

    expect(
      container.querySelector('[data-sl-pagination-actions]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-action-prev]')
    ).toBeDisabled()
  })

  test('action next should be disabled on the last page', () => {
    const { container } = render(
      <Pagination page={2} total={50} size={25} sizeOptions={[25, 50, 100]} />
    )

    expect(
      container.querySelector('[data-sl-pagination-actions]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-pagination-action-next]')
    ).toBeDisabled()
  })

  test('number of pages', () => {
    const { container, getByText } = render(
      <Pagination page={1} total={55} size={25} />
    )

    expect(
      container.querySelector('[data-sl-pagination-total-label]')
    ).toBeInTheDocument()

    expect(getByText('1 of 3')).toBeTruthy()
  })
})
