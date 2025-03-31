import {
  describe,
  expect,
  render,
  test,
  waitFor,
  screen,
} from '@vtex/shoreline-test-utils'
import { ChartCompositor } from '../components'
// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from 'react'

describe('@vtex.shoreline-charts chart compositor tests', () => {
  test('make sure the data is correct', async () => {
    const data1 = [1, 2, 3, 4, 5]
    const data2 = [1, 3, 2, 5, 4]

    const { container } = render(
      <ChartCompositor
        charts={[
          { serie: { data: data1 }, config: { type: 'bar' } },
          { serie: { data: data2 }, config: { type: 'bar' } },
        ]}
        background={{ type: 'bar' }}
        tooltip={{ type: 'line' }}
      />
    )

    const divChartContainer = container.querySelector('[data-sl-chart]')
    await waitFor(() => expect(divChartContainer).toBeInTheDocument())

    data1.forEach((v) => {
      waitFor(() => expect(screen.queryByText(v)).toBeInTheDocument())
    })

    data2.forEach((v) => {
      waitFor(() => expect(screen.queryByText(v)).toBeInTheDocument())
    })
  })
})

// describe('@vtex.shoreline-charts chart compositor', () => {
//   test('trying render the 10 thousand points chart under 80 miliseconds')
// })
