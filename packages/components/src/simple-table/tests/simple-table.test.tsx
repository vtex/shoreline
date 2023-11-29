import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { SimpleTable } from '../simple-table'

describe('simple-table', () => {
  test('renders', () => {
    const { container } = render(<SimpleTable data={[]} columns={[]} />)

    expect(
      container.querySelector('[data-sl-simple-table]')
    ).toBeInTheDocument()
  })
})
