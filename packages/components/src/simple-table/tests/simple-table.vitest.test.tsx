import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { SimpleTable } from '../simple-table'

describe('simple-table', () => {
  test('renders', () => {
    const { container } = render(<SimpleTable data={[]} columns={[]} />)

    expect(
      container.querySelector('[data-sl-simple-table]')
    ).toBeInTheDocument()
  })
})
