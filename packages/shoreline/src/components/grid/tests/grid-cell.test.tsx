import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { GridCell } from '../grid-cell'

describe('grid-cell', () => {
  it('emits only the placement variables that were provided', () => {
    const { container } = render(<GridCell area="header" />)
    const cell = container.querySelector('[data-sl-grid-cell]')

    expect(cell).toBeInTheDocument()
    expect(cell?.style.getPropertyValue('--sl-grid-cell-area')).toBe('header')
    expect(cell?.style.getPropertyValue('--sl-grid-cell-column')).toBe('')
    expect(cell?.style.getPropertyValue('--sl-grid-cell-row')).toBe('')
    expect(cell?.style.getPropertyValue('--sl-grid-cell-column-start')).toBe('')
    expect(cell?.style.getPropertyValue('--sl-grid-cell-column-end')).toBe('')
    expect(cell?.style.getPropertyValue('--sl-grid-cell-row-start')).toBe('')
    expect(cell?.style.getPropertyValue('--sl-grid-cell-row-end')).toBe('')
  })

  it('keeps explicit placement overrides available', () => {
    const { container } = render(<GridCell area="header" column="1 / 3" />)
    const cell = container.querySelector('[data-sl-grid-cell]')

    expect(cell).toBeInTheDocument()
    expect(cell?.style.getPropertyValue('--sl-grid-cell-area')).toBe('header')
    expect(cell?.style.getPropertyValue('--sl-grid-cell-column')).toBe('1 / 3')
  })
})
