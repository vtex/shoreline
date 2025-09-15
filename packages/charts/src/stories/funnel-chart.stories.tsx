import { Chart } from '../index'
import type { StoryObj } from '@storybook/react'

export default {
  title: 'Charts/funnel',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

export const Basic: Story = {
  args: {
    chartConfig: { type: 'funnel' },
    series: [
      {
        name: "This probably shouldn't be visible",
        data: [
          { value: 450, name: 'A' },
          { value: 250, name: 'B' },
          { value: 200, name: 'C' },
          { value: 150, name: 'D' },
          { value: 50, name: 'E' },
        ],
      },
    ],
    style: { width: 600 },
  },
}
