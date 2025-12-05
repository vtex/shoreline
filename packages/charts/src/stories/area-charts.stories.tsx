import type { StoryObj } from '@storybook/react'
import { Chart } from '../index'
import { useState } from 'react'
import { Button } from '@vtex/shoreline'

export default {
  title: 'Charts/area',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

export const Basic: Story = {
  args: {
    series: [{ data: [70, 40, 55, 35, 39, 30, 25] }],
    xAxis: { data: ['一', '二', '三', '四', '五', '六', '七'] },
    chartConfig: { type: 'area' },
  },
}

export const MaximumAmoutOfOverlappedAreas: Story = {
  args: {
    // style: { height: 550 },
    series: [
      { data: [70, 40, 55, 35, 39, 30, 25], name: 'Product A' },
      { data: [0, 0, 5, 10, 25, 45, 55], name: 'Product B' },
    ],
    chartConfig: { type: 'area', variant: 'overlapping' },
    xAxis: { data: ['1º', '2º', '3º', '4º', '5º', '6º', '7º'] },
  },
}

export const StackedArea: Story = {
  render: () => {
    return (
      <Chart
        chartConfig={{ type: 'area', variant: 'stacked' }}
        // biome-ignore format: matrix
        series={[
          { data: [3, 4, 8, 8, 5, 4, 10, 9, 2, 7, 6, 3, 9, 2, 3], name: 'Series 1'},
          { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5], name: 'Series 2' },
          { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5], name: 'Series 3' },
          { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5], name: 'Series 4' },
          { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5], name: 'Series 5' },
        ]}
        style={{ height: 550 }}
      />
    )
  },
}

export const Loading: Story = {
  render: () => {
    const [currentSeries, setCurrentSeries] = useState<any>([{}])
    const [isLoading, setIsLoading] = useState(true)

    return (
      <>
        <Button
          style={{ marginBottom: 'var(--sl-space-2)' }}
          variant={'primary'}
          onClick={() => {
            if (isLoading) {
              setCurrentSeries([
                { data: [70, 40, 55, 35, 39, 30, 25], name: 'Product A' },
                { data: [0, 0, 5, 10, 25, 45, 55], name: 'Product B' },
              ])
              setIsLoading(false)
            } else {
              setIsLoading(true)
            }
          }}
        >
          {isLoading ? 'Finish Loading' : 'Unload'}
        </Button>
        <Chart
          chartConfig={{ type: 'area', variant: 'overlapping' }}
          xAxis={{ data: ['1º', '2º', '3º', '4º', '5º', '6º', '7º'] }}
          series={currentSeries}
          style={{ height: 300 }}
          loading={isLoading}
          loadingOptions={{ numLines: 8 }}
        />
      </>
    )
  },
}
