import type { StoryObj } from '@storybook/react'
import { Chart } from '../index'

export default {
  title: 'Charts/area',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

export const MultipleGradientArea: Story = {
  render: () => {
    return (
      <Chart
        style={{ height: 550 }}
        series={[
          { data: [6, 5, 2, 7, 1, 10, 6, 5, 1, 5, 6, 3, 8, 10, 4] },
          { data: [4, 7, 5, 2, 6, 2, 6, 2, 6, 8, 4, 5, 9, 1, 5] },
        ]}
        chartConfig={{ type: 'line', variant: 'area' }}
      />
    )
  },
}

export const StackedArea: Story = {
  render: () => {
    return (
      <Chart
        style={{ height: 550 }}
        series={[
          {
            data: [3, 4, 8, 8, 5, 4, 10, 9, 2, 7, 6, 3, 9, 2, 3],
            stack: 'stack',
          },
          {
            data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5],
            stack: 'stack',
          },
          {
            data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5],
            stack: 'stack',
          },
          {
            data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5],
            stack: 'stack',
          },
          {
            data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5],
            stack: 'stack',
          },
        ]}
        chartConfig={{ type: 'line', variant: 'area' }}
      />
    )
  },
}
