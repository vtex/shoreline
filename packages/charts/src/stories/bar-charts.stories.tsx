import { Chart } from '../index'
import type { StoryObj } from '@storybook/react'
import { useRef } from 'react'
import type EChartsReact from 'echarts-for-react'
import { compactNumber } from '../utils/format'
import { Grid } from '@vtex/shoreline'
import type { SeriesOption } from 'echarts'

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
    loading: false,
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
export const Gap1: Story = {
  args: {
    xAxis: { data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    series: [
      { data: [3, 2, 3, 4, 3, 7, 7], name: 'Series 1' },
      { data: [1, 4, 2, 3, 3, 5, 6], name: 'Series 2' },
    ],
    chartConfig: { type: 'bar', gap: 1 },
  },
  name: 'Gap-1',
}
export const Gap2: Story = {
  args: {
    xAxis: { data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    series: [
      { data: [3, 2, 3, 4, 3, 7, 7], name: 'Series 1' },
      { data: [1, 4, 2, 3, 3, 5, 6], name: 'Series 2' },
    ],
    chartConfig: { type: 'bar', gap: 2 },
  },
  name: 'Gap-2',
}
export const Gap3: Story = {
  args: {
    xAxis: { data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    series: [
      { data: [3, 2, 3, 4, 3, 7, 7], name: 'Series 1' },
      { data: [1, 4, 2, 3, 3, 5, 6], name: 'Series 2' },
    ],
    chartConfig: { type: 'bar', gap: 3 },
  },
  name: 'Gap-3',
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
    yAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
    series: [
      { data: [1, 2, 3, 4, 5], name: 'Series 1' },
      { data: [1, 4, 2, 1, 4], name: 'Series 2' },
    ],
    chartConfig: { type: 'bar', variant: 'horizontal', gap: 3 },
    style: { height: 400 },
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
    title: {
      text: 'Reload animation by clicking on the legend',
      left: 'center',
    },
    chartConfig: { type: 'bar' },
  },
}

export const AnimationSpeeds: Story = {
  render: () => {
    const data: SeriesOption[] = [
      {
        name: 'Email',
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: 'Union Ads',
        data: [220, 182, 191, 234, 290, 330, 260],
      },
      {
        name: 'Video Ads',
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: 'Direct',
        data: [320, 332, 301, 334, 390, 330, 320],
      },
    ]
    return (
      <Grid columns={'50% 50%'} rows={'50% 50%'} style={{ width: 1000 }}>
        <Chart
          xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
          title={{ text: '100' }}
          chartConfig={{ type: 'bar' }}
          series={data}
          option={{
            animationDurationUpdate: (idx) => idx * 100,
            animationDelayUpdate: (idx) => idx * 50,
          }}
          group="A"
        />
        <Chart
          title={{
            text: '50',
          }}
          xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
          chartConfig={{ type: 'bar' }}
          series={data}
          option={{
            animationDurationUpdate: (idx) => idx * 50,
            animationDelayUpdate: (idx) => idx * 50,
          }}
          group="A"
        />
        <Chart
          title={{ text: '25' }}
          xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
          chartConfig={{ type: 'bar' }}
          series={data}
          option={{
            animationDurationUpdate: (idx) => idx * 25,
            animationDelayUpdate: (idx) => idx * 50,
          }}
          group="A"
        />
        <Chart
          title={{ text: '15' }}
          xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
          chartConfig={{ type: 'bar' }}
          series={data}
          option={{
            animationDurationUpdate: (idx) => idx * 15,
            animationDelayUpdate: (idx) => idx * 50,
          }}
          group="A"
        />
      </Grid>
    )
  },
}
