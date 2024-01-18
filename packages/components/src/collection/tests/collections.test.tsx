import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { Collection, CollectionView } from '../index'

describe('collection', () => {
  test('renders', () => {
    const { container } = render(<Collection />)

    expect(container.querySelector('[data-sl-collection]')).toBeInTheDocument()
  })

  test('status ready', () => {
    const { container } = render(<CollectionView status="ready" />)

    expect(
      container.querySelector('[data-sl-collection-view]')
    ).toBeInTheDocument()

    expect(
      container.querySelector('[data-sl-collection-view-ready]')
    ).toBeInTheDocument()

    expect(
      container.querySelector('[data-sl-collection-view-heading]')
    ).not.toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-description]')
    ).not.toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-action]')
    ).not.toBeInTheDocument()
  })

  test('status loading', () => {
    const { container } = render(<CollectionView status="loading" />)

    expect(
      container.querySelector('[data-sl-collection-view]')
    ).not.toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-heading]')
    ).not.toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-description]')
    ).not.toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-action]')
    ).not.toBeInTheDocument()

    expect(
      container.querySelector('[data-collection-view-skeleton]')
    ).toBeInTheDocument()
  })

  test('status error', () => {
    const { container } = render(<CollectionView status="error" />)

    expect(
      container.querySelector('[data-sl-collection-view]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-heading]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-description]')
    ).not.toBeInTheDocument()

    expect(
      container.querySelector('[data-sl-collection-view-action]')
    ).toBeInTheDocument()
  })

  test('status empty', () => {
    const { container } = render(<CollectionView status="empty" />)

    expect(
      container.querySelector('[data-sl-collection-view]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-heading]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-description]')
    ).toBeInTheDocument()

    expect(
      container.querySelector('[data-sl-collection-view-action]')
    ).toBeInTheDocument()
  })

  test('status not-found', () => {
    const { container } = render(<CollectionView status="not-found" />)

    expect(
      container.querySelector('[data-sl-collection-view]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-heading]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-description]')
    ).toBeInTheDocument()

    expect(
      container.querySelector('[data-sl-collection-view-action]')
    ).not.toBeInTheDocument()
  })

  test('status unauthorized', () => {
    const { container } = render(<CollectionView status="unauthorized" />)

    expect(
      container.querySelector('[data-sl-collection-view]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-heading]')
    ).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-collection-view-description]')
    ).toBeInTheDocument()

    expect(
      container.querySelector('[data-sl-collection-view-action]')
    ).not.toBeInTheDocument()
  })
})
