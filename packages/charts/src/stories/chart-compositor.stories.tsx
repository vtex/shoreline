import type { StoryObj } from '@storybook/react'
import { ChartCompositor } from '../index'
import { CHART_COMPOSITOR_DATA } from '../benchmarks/__fixtures__/chartData'

export default {
  title: 'Charts/chart-compositor',
  component: ChartCompositor,
}

type Story = StoryObj<typeof ChartCompositor>

export const Stress: Story = {
  args: {
    charts: [
      {
        series: { data: CHART_COMPOSITOR_DATA.data4_thousand },
        chartConfig: { type: 'line' },
      },
      {
        series: { data: CHART_COMPOSITOR_DATA.data4_thousand },
        chartConfig: { type: 'bar' },
      },
      {
        series: { data: CHART_COMPOSITOR_DATA.data4_thousand },
        chartConfig: { type: 'bar' },
      },
    ],
    tooltip: { type: 'line' },
  },
}

const data1: number[] = []
const data2: number[] = []
const data3: number[] = []

for (let i = 0; i < 25; i++) {
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
  data3.push((data1[i] + data2[i]) / 2)
}
export const Basic: Story = {
  args: {
    charts: [
      {
        series: { data: data1, name: 'Bar 1' },
        chartConfig: { type: 'bar' },
      },
      {
        series: {
          data: data2,
          name: 'Bar 2',
        },
        chartConfig: { type: 'bar' },
      },
      {
        series: {
          data: data3,
          name: 'Line',
        },
        chartConfig: { type: 'line' },
      },
    ],
    tooltip: { type: 'line' },
    zoom: true,
    options: { grid: { height: '75%' } },
  },
}
