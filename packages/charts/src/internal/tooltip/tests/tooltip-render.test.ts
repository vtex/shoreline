import { describe, expect, test } from 'vitest'

import { renderChartTooltip } from '../tooltip-render'

describe('renderChartTooltip', () => {
  test('renders the title and one row per item', () => {
    const html = renderChartTooltip({
      title: 'Jan',
      rows: [{ label: 'Revenue', value: '139', color: '#3993f4' }],
    })

    expect(html).toContain('data-sl-chart-tooltip-title')
    expect(html).toContain('Jan')
    expect(html).toContain('Revenue')
    expect(html).toContain('139')
    expect(html).toContain('background-color:#3993f4')
  })

  test('omits the title element when there is no title', () => {
    const html = renderChartTooltip({
      rows: [{ label: 'Revenue', value: '139' }],
    })

    expect(html).not.toContain('data-sl-chart-tooltip-title')
  })

  test('omits the line swatch when the row has no color', () => {
    const html = renderChartTooltip({
      rows: [{ label: 'Revenue', value: '139' }],
    })

    expect(html).not.toContain('data-sl-chart-tooltip-row-line')
  })

  test('renders nothing when there are no rows', () => {
    expect(renderChartTooltip({ title: 'Jan', rows: [] })).toBe('')
  })

  test('escapes HTML in labels, values, and titles', () => {
    const html = renderChartTooltip({
      title: '<img>',
      rows: [{ label: '<script>', value: '1 & 2' }],
    })

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<img>')
    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('&lt;img&gt;')
    expect(html).toContain('1 &amp; 2')
  })

  test('renders a variation with its direction and tone', () => {
    const html = renderChartTooltip({
      rows: [
        {
          label: 'Revenue',
          value: '139',
          variation: { value: '12%', direction: 'up', tone: 'success' },
        },
      ],
    })

    expect(html).toContain('data-direction="up"')
    expect(html).toContain('data-tone="success"')
    expect(html).toContain('<svg')
  })

  test('defaults variation tone to neutral', () => {
    const html = renderChartTooltip({
      rows: [
        {
          label: 'Revenue',
          value: '139',
          variation: { value: '0%', direction: 'up' },
        },
      ],
    })

    expect(html).toContain('data-tone="neutral"')
  })

  test('omits the arrow icon for a flat variation', () => {
    const html = renderChartTooltip({
      rows: [
        {
          label: 'Revenue',
          value: '139',
          variation: { value: '0%', direction: 'flat' },
        },
      ],
    })

    expect(html).not.toContain('<svg')
  })
})
