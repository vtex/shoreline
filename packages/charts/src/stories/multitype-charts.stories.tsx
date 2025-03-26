import type { StoryObj } from '@storybook/react'
import { ChartCompositor } from '../index'

export default {
  title: 'Charts/multitype',
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
  },
}
