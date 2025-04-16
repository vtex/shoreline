// biome-ignore lint/correctness/noUnusedImports: <explanation>
import React from 'react'
import { Chart } from '../index'
import { compactNumber } from '../utils/format'
import type { StoryObj } from '@storybook/react'

const Bar = {
  title: 'Charts/bar',
  component: Chart,
}
export default Bar

type Story = StoryObj<typeof Chart>

export const Basic: Story = {
  args: {
    option: {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
    },
    chartConfig: { type: 'bar' },
  },
}

export const Loading: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: (args) => {
    const { option, chartConfig, loading } = args

    return (
      <Chart
        option={option}
        chartConfig={chartConfig}
        // style={{ height: 300 }}
        loading={loading}
      />
    )
  },
  args: {
    option: {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
    },
    chartConfig: { type: 'bar' },
    loading: true,
  },
}
export const MultiSeries: Story = {
  args: {
    option: {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed'],
      },
      series: [
        { data: [3, 2, 3, 4], name: 'Series 1' },
        { data: [1, 4, 2, 3], name: 'Series 2' },
        { data: [2, 1, 4, 1], name: 'Series 3' },
      ],
    },
    chartConfig: { type: 'bar' },
  },
}
export const WithHugeNumbers: Story = {
  args: {
    option: {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed'],
      },
      yAxis: {
        axisLabel: {
          formatter: (value: number) => compactNumber(value),
        },
      },
      series: [
        {
          data: [12344441, 62346346, 97346346],
          name: 'Series 1',
        },
      ],
    },
    chartConfig: { type: 'bar' },
  },
}

export const Horizontal: Story = {
  args: {
    option: {
      yAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Test'],
      },
      series: [
        { data: [1, 2, 3, 4, 5, 6, 7, 8], name: 'Series 0' },
        { data: [1, 4, 2, 1, 4, 3, 5, 9], name: 'Series 1' },
      ],
    },
    chartConfig: { type: 'bar', variant: 'horizontal' },
  },
}

const data2: (number | object)[] = []
const data1: number[] = []

for (let i = 0; i < 50; i++) {
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
}
export const Animation: Story = {
  args: {
    option: {
      series: [
        { data: data1, name: 'Default animation' },
        {
          data: data2,
          name: 'Custom animation',
          animationDelay: (idx) => idx * 50,
          animationEasing: 'elasticInOut',
        },
      ],
      title: {
        text: 'Reload animation by clicking on the legend',
        left: 'center',
      },
    },
    chartConfig: { type: 'bar', variant: 'default' },
  },
}
