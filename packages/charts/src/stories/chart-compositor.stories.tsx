import type { StoryObj } from '@storybook/react'
import { ChartCompositor } from '../index'
import { CHART_COMPOSITOR_DATA } from '../tests/__fixtures__/chartData'

export default {
  title: 'Charts/chart-compositor',
  component: ChartCompositor,
}

type Story = StoryObj<typeof ChartCompositor>

export const Testing: Story = {
  args: {
    charts: [
      { serie: { data: [1, 2, 3, 4, 5] }, config: { type: 'bar' } },
      { serie: { data: [1, 3, 2, 5, 4] }, config: { type: 'line' } },
    ],
    background: { type: 'bar' },
    tooltip: { type: 'line' },
    options: {
      xAxis: { type: 'category', data: ['mon', 'tue', 'wed', 'thu', 'fri'] },
    },
  },
}

export const LargeNumbers: Story = {
  args: {
    charts: [
      {
        serie: { data: CHART_COMPOSITOR_DATA.data4_thousand },
        config: { type: 'line' },
      },
      {
        serie: { data: CHART_COMPOSITOR_DATA.data4_thousand },
        config: { type: 'bar' },
      },
      {
        serie: { data: CHART_COMPOSITOR_DATA.data4_thousand },
        config: { type: 'bar' },
      },
    ],
    background: { type: 'bar' },
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
export const MultitypeAnimation: Story = {
  render: () => (
    <ChartCompositor
      charts={[
        { serie: { data: data1, name: 'Bar 1' }, config: { type: 'bar' } },
        {
          serie: {
            data: data2,
            name: 'Bar 2',
            animationDelay: (idx) => idx * 50,
            animationEasing: 'elasticInOut',
          },
          config: { type: 'bar' },
        },
        {
          serie: {
            data: data3,
            name: 'average',
          },
          config: { type: 'line' },
        },
      ]}
      background={{ type: 'bar' }}
      tooltip={{ type: 'line' }}
    />
  ),
}
