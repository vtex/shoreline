import type { StoryObj } from '@storybook/react'
import { Chart } from '../index'

export default {
  title: 'Charts/area',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

export const Basic: Story = {
  args: {
    series: [{ data: [70, 40, 55, 35, 39, 30, 25], name: 'Data' }],
    xAxis: { data: ['一', '二', '三', '四', '五', '六', '七'] },
    chartConfig: { type: 'area' },
  },
}

export const MultipleGradientArea: Story = {
  args: {
    style: { height: 550 },
    series: [
      { data: [6, 5, 2, 7, 1, 10, 6, 5, 1, 5, 6, 3, 8, 10, 4], name: 'Data 1' },
      { data: [4, 7, 5, 2, 6, 2, 6, 2, 6, 8, 4, 5, 9, 1, 5], name: 'Data 2' },
    ],
    zoom: true,
    chartConfig: { type: 'area' },
  },
}

export const StackedArea: Story = {
  args: {
    style: { height: 550 },
    series: [
      { data: [3, 4, 8, 8, 5, 4, 10, 9, 2, 7, 6, 3, 9, 2, 3] },
      { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5] },
      { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5] },
      { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5] },
      { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5] },
    ],
    chartConfig: { type: 'area', variant: 'stacked' },
    zoom: true,
  },
}
