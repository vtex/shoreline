import type { StoryObj } from '@storybook/react'
import { Chart, ChartCompositor } from '../index'

export default {
  title: 'Charts/scatter',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

const data1: [number, number][] = []

for (let i = 0; i < 10; i++) {
  data1.push([i, Math.ceil(Math.random() * 100)])
}

const data2: [number, number][] = []

for (let i = 0; i < 10; i++) {
  data2.push([i, Math.ceil(Math.random() * 100)])
}

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
