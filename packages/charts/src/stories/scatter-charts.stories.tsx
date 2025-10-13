import type { StoryObj } from '@storybook/react'
import { Chart, ChartCompositor } from '../index'

export default {
  title: 'Charts/scatter',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

const data1: any[] = [
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

const data1alternative: any[] = [
  [0, 19, 4],
  [1, 53, 6],
  [2, 27, 8],
  [3, 4, 18],
  [4, 27, 5],
  [5, 36, 3],
  [6, 94, 9],
  [7, 80, 7],
  [8, 31, 5],
  [9, 57, 10],
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

export const Tooltip2Variant: Story = {
  args: {
    series: [
      { data: data1alternative, name: 'Serie 1' },
      { data: data2, name: 'Serie 2' },
    ],
    chartConfig: { type: 'scatter', variant: 'tooltip2' },
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
