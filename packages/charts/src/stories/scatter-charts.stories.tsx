import type { StoryObj } from '@storybook/react'
import { Chart, ChartCompositor } from '../index'

export default {
  title: 'Charts/scatter',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

const data1: [number, number][] = [
  [0, 19],
  [1, 53],
  [2, 27],
  [3, 4],
  [4, 27],
  [5, 36],
  [6, 94],
  [7, 80],
  [8, 31],
  [9, 57],
]

const data2: [number, number][] = [
  [0, 2],
  [1, 4],
  [2, 92],
  [3, 68],
  [4, 2],
  [5, 3],
  [6, 67],
  [7, 3],
  [8, 69],
  [9, 39],
]

export const Basic: Story = {
  args: {
    series: [
      { data: data1, name: 'Serie 1' },
      { data: data2, name: 'Serie 2' },
    ],
    chartConfig: { type: 'scatter' },
  },
}

export const UsingChartCompositor = {
  render: () => {
    return (
      <ChartCompositor
        charts={[
          {
            series: { data: data1, name: 'Serie 1' },
            chartConfig: { type: 'scatter' },
          },
          {
            series: { data: data2, name: 'Serie 2' },
            chartConfig: { type: 'line' },
          },
        ]}
        tooltip={{
          type: 'line',
        }}
      />
    )
  },
}
