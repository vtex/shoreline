import { Chart } from '../index'
import type { StoryObj } from '@storybook/react'
import { useRef } from 'react'
import type EChartsReact from 'echarts-for-react'

const Bar = {
  title: 'Charts/bar',
  component: Chart,
}
export default Bar

type Story = StoryObj<typeof Chart>

export const Basic: Story = {
  args: {
    xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    series: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
    chartConfig: { type: 'bar' },
  },
}

export const Loading: Story = {
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  render: (args) => {
    const { series, xAxis, option, chartConfig, loading } = args

    return (
      <Chart
        series={series}
        xAxis={xAxis}
        option={option}
        chartConfig={chartConfig}
        // style={{ height: 300 }}
        loading={loading}
      />
    )
  },
  args: {
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    series: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
    chartConfig: { type: 'bar' },
    loading: true,
  },
}
export const MultiSeriesSmall: Story = {
  args: {
    xAxis: { data: ['Mon', 'Tue', 'Wed'] },
    series: [
      { data: [3, 2, 1], name: 'Series 1' },
      { data: [1, 4, 3], name: 'Series 2' },
    ],
    chartConfig: { type: 'bar', gap: 1 },
  },
}
export const MultiSeriesMid: Story = {
  args: {
    xAxis: { data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    series: [
      { data: [3, 2, 3, 4, 1, 9, 7], name: 'Series 1' },
      { data: [1, 4, 2, 3, 1, 5, 9], name: 'Series 2' },
      { data: [23, 43, 1, 23, 5, 2], name: 'series 3' },
      { data: [9, 3, 14, 2, 8, 5, 10], name: 'series 4' },
    ],
    chartConfig: { type: 'bar', gap: 2 },
  },
}
export const MultiSeriesBig: Story = {
  args: {
    xAxis: { data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    series: [
      { data: [2, 1, 4, 1, 7, 2, 1, 2, 1, 4, 1, 7, 2, 1], name: 'Series 1' },
      { data: [1, 4, 2, 3, 1, 5, 9, 1, 4, 2, 3, 1, 5, 9], name: 'Series 2' },
    ],
    chartConfig: { type: 'bar', gap: 3 },
  },
}

export const Tooltip: Story = {
  render: () => {
    const ref = useRef<EChartsReact>(null)
    return (
      <Chart
        ref={ref}
        chartConfig={{ type: 'bar', variant: 'vertical' }}
        series={[
          { data: [3, 2, 3, 4], name: 'Series 1' },
          { data: [1, 4, 2, 3], name: 'Series 2' },
          { data: [2, 1, 4, 1], name: 'Series 3' },
        ]}
        xAxis={{ data: ['Mon', 'Tue', 'Wed'] }}
        option={{ tooltip: { alwaysShowContent: true } }}
        onEvents={{
          rendered: () => {
            if (ref.current) {
              ref.current.getEchartsInstance().dispatchAction({
                type: 'showTip',
                x: 200,
                y: 50,
                position: ['50%', '50%'],
              })
            }
          },
        }}
      />
    )
  },
}
export const WithHugeNumbers: Story = {
  args: {
    xAxis: { data: ['Mon', 'Tue', 'Wed'] },
    yAxis: {
      axisLabel: {
        formatter: (value: number) => compactNumber(value),
      },
    },
    series: [{ data: [12344441, 62346346, 97346346], name: 'Series 1' }],
    chartConfig: { type: 'bar' },
  },
}

export const Horizontal: Story = {
  args: {
    yAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Test'] },
    series: [
      { data: [1, 2, 3, 4, 5, 6, 7, 8], name: 'Series 0' },
      { data: [1, 4, 2, 1, 4, 3, 5, 9], name: 'Series 1' },
    ],
    chartConfig: { type: 'bar', variant: 'horizontal', gap: 2 },
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
    series: [
      { data: data1, name: 'Default animation' },
      {
        data: data2,
        name: 'Custom animation',
        animationDelay: (idx) => idx * 50,
        animationEasing: 'elasticInOut',
      },
    ],
    option: {
      title: {
        text: 'Reload animation by clicking on the legend',
        left: 'center',
      },
    },
    chartConfig: { type: 'bar' },
  },
}
