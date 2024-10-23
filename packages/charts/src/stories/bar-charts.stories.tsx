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
    style: { height: 550 },
  },
}

export const Loading: Story = {
  render: (args) => {
    const { option, chartConfig, loading } = args

    return (
      <Chart
        option={option}
        chartConfig={chartConfig}
        style={{ height: 550 }}
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
    style: { height: 550 },
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
    style: { height: 550 },
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
    style: { height: 550 },
  },
}

export const Horizontal: Story = {
  args: {
    option: {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Test'],
      },
      series: [
        { data: [1, 2, 3, 4, 5, 6, 7, 8] },
        { data: [1, 4, 2, 1, 4, 3, 5, 9] },
      ],
    },
    chartConfig: { type: 'bar', variant: 'horizontal' },
    style: { height: 550 },
  },
}

export const MultiType: Story = {
  args: {
    option: {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: [
        { data: [1, 2, 3, 4, 5, 6, 7] },
        { data: [1, 4, 2, 1, 4, 3, 5], type: 'line' },
      ],
    },
    chartConfig: { type: 'bar', variant: 'default' },
    style: { height: 550 },
  },
}
