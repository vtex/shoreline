import {
  describe,
  expect,
  render,
  screen,
  test,
  vi,
} from '@vtex/shoreline-test-utils'

import { BarChart } from '../index'

class ResizeObserverStub {
  observe() {}

  unobserve() {}

  disconnect() {}
}

vi.stubGlobal('ResizeObserver', ResizeObserverStub)

// jsdom has no canvas implementation; the engine only uses the 2d context to
// measure text, even when rendering to SVG.
vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
  font: '',
  measureText: (text: string) => ({ width: text.length * 8 }),
} as unknown as CanvasRenderingContext2D)

// jsdom does no layout, so give elements a size for the engine to render into
vi.spyOn(Element.prototype, 'clientWidth', 'get').mockReturnValue(400)
vi.spyOn(Element.prototype, 'clientHeight', 'get').mockReturnValue(300)

const data = {
  label: 'Revenue by month',
  categories: ['Jan', 'Feb'],
  series: [{ name: 'Revenue', data: [10, 20] }],
}

describe('bar-chart', () => {
  test('renders an svg chart with an accessible name', () => {
    const { container } = render(<BarChart {...data} />)

    const chart = container.querySelector('[data-sl-bar-chart]')

    expect(chart).toBeInTheDocument()
    expect(chart).toHaveAccessibleName('Revenue by month')
    expect(chart).toHaveAttribute('role', 'img')
    expect(chart?.querySelector('svg')).toBeInTheDocument()
  })

  test('describes the chart when a description is given', () => {
    render(<BarChart {...data} description="Revenue grew 20% in February" />)

    expect(screen.getByRole('img')).toHaveAccessibleDescription(
      'Revenue grew 20% in February'
    )
  })

  test('renders a loading placeholder while loading', () => {
    const { container } = render(<BarChart {...data} loading />)

    expect(container.querySelector('[data-sl-skeleton]')).toBeInTheDocument()
    expect(container.querySelector('svg')).not.toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('aria-busy', 'true')
  })

  test('renders the empty state when there is no data', () => {
    const { container } = render(
      <BarChart {...data} series={[]} emptyLabel="Nothing to show" />
    )

    expect(
      container.querySelector('[data-sl-bar-chart-empty]')
    ).toHaveTextContent('Nothing to show')
    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  test('legends series past the third as a single aggregate entry', () => {
    const { container } = render(
      <BarChart
        {...data}
        series={[
          { name: 'Website', data: [10, 20] },
          { name: 'Marketplace', data: [5, 6] },
          { name: 'Physical store', data: [3, 4] },
          { name: 'Social', data: [2, 2] },
          { name: 'Phone', data: [1, 1] },
        ]}
      />
    )

    const legend = container.querySelector('svg')?.textContent

    expect(legend).toContain('Others')
    expect(legend).not.toContain('Social')
    expect(legend).not.toContain('Phone')
  })

  test('renders category labels through the engine', () => {
    const { container } = render(<BarChart {...data} />)

    expect(container.querySelector('svg')?.textContent).toContain('Jan')
    expect(container.querySelector('svg')?.textContent).toContain('Feb')
  })
})
