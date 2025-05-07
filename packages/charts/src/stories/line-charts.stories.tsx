import type { StoryObj } from '@storybook/react'
import { Chart } from '../index'

export default {
  title: 'Charts/line',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

export const Basic: Story = {
  args: {
    option: {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    },
    chartConfig: { type: 'line' },
    style: { height: 550 },
  },
}
export const MultiLines: Story = {
  args: {
    chartConfig: { type: 'line' },
    style: { height: 550 },
    option: {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union Ads',
          type: 'line',
          data: [220, 182, 191, 234, 290, 330, 260],
        },
        {
          name: 'Video Ads',
          type: 'line',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'Direct',
          type: 'line',
          data: [320, 332, 301, 334, 390, 330, 320],
        },
      ],
    },
  },
}
export const Stacked: Story = {
  args: {
    chartConfig: { type: 'line' },
    style: { height: 550 },
    option: {
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: [
        {
          name: 'Email',
          type: 'line',
          stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: 'Union Ads',
          type: 'line',
          stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310],
        },
        {
          name: 'Video Ads',
          type: 'line',
          stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410],
        },
        {
          name: 'Direct',
          type: 'line',
          stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320],
        },
        {
          name: 'Search Engine',
          type: 'line',
          stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320],
        },
      ],
    },
  },
}

export const Dashed: Story = {
  args: {
    chartConfig: { type: 'line' },
    style: { height: 550 },
    option: {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        lineStyle: { type: 'dashed' },
      },
    },
  },
}
