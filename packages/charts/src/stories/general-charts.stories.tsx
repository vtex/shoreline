// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { Chart } from '../index'
import type { StoryObj } from '@storybook/react'

export default {
  title: 'Charts/general',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

export const Basic: Story = {
  render: (args) => {
    return (
      <>
        <Chart
          option={{
            xAxis: { data: ['a', 'b', 'c', 'd', 'e', 'e', 'f', 'g', 'h', 'i'] },
            series: { data: [23, 432, 67, 43, 25, 134, 54, 373, 623, 412] },
          }}
          chartConfig={{ type: 'bar' }}
          group="group1"
        />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        <Chart
          option={{
            series: { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
            xAxis: { data: ['a', 'b', 'c', 'd', 'e', 'e', 'f', 'g', 'h', 'i'] },
          }}
          group="group1"
          chartConfig={{ type: 'bar' }}
        />
      </>
    )
  },
}
