import { Chart } from '../index'
import type { StoryObj } from '@storybook/react'

export default {
  title: 'Charts/donut',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

export const Basic: Story = {
  args: {
    chartConfig: { type: 'donut' },
    style: { height: 500 },
    series: {
      data: [
        { value: 1048, name: 'A' },
        { value: 735, name: 'B' },
        { value: 580, name: 'C' },
        { value: 484, name: 'D' },
        { value: 300, name: 'E' },
      ],
    },
  },
}
