import React from 'react'
import { describe, expect, test, render } from '@vtex/shoreline-test-utils'

import { TsTable } from '../ts-table'

describe('ts-table', () => {
  test('renders', () => {
    const { container } = render(<TsTable data={[]} columns={[]} />)

    expect(container.querySelector('[data-sl-ts-table]')).toBeInTheDocument()
  })
})
