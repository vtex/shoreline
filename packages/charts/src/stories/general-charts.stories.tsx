// biome-ignore lint/correctness/noUnusedImports: <explanation>
import { random } from 'lodash'
import { Chart, ChartCompositor } from '../index'
import type { StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '@vtex/shoreline'

export default {
  title: 'Charts/general',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

export const BasicExample: Story = {
  render: () => {
    return (
      <>
        <ChartCompositor
          charts={[
            {
              series: {
                data: [3, 4, 3, 11, 5, 8, 6, 6, 10, 6, 8, 6],
                name: 'CCCC',
              },
              chartConfig: { type: 'bar' },
            },
            {
              series: {
                data: [8, 1, 7, 2, 6, 1, 10, 1, 1, 7, 8, 1],
                name: 'AAAA',
              },
              chartConfig: { type: 'bar' },
            },
            {
              series: {
                data: [1, 8, 7, 11, 7, 3, 6, 7, 0, 11, 6, 8],
                name: 'BBBB',
              },
              chartConfig: { type: 'line' },
            },
          ]}
          tooltip={{ type: 'bar' }}
          xAxis={{
            data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K', 'L'],
          }}
          group="sync"
        />
        <Chart
          series={[
            {
              data: [5, 6, 1, -12, 2, -7, 10, 7, 10, 9, 3, 5],
              name: 'DDDD',
            },
            {
              data: [10, -4, 6, 11, 9, 10, -6, 2, -8, -4, 3, 4],
              name: 'EEEE',
            },
          ]}
          xAxis={{
            data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'I', 'J', 'K', 'L'],
          }}
          chartConfig={{ type: 'bar', gap: 2 }}
          group="sync"
        />
      </>
    )
  },
}

export const ManyChartsSync: Story = {
  render: () => {
    const data: number[] = []
    for (let i = 0; i < 9; i++) {
      data.push(random(10, false))
    }

    return (
      <>
        <Chart
          series={{ name: 'AAAA', data: [1, 2, 3, 4, 5, 6, 7, 8, 9] }}
          chartConfig={{ type: 'bar' }}
          group="vtex"
        />
        <Chart
          series={{ name: 'AAAA', data: [9, 8, 7, 6, 5, 4, 3, 2, 1] }}
          chartConfig={{ type: 'line' }}
          group="vtex"
        />
        <Chart
          series={{ name: 'AAAA', data: [2, 4, 6, 7, 9, 0, 8, 6, 4] }}
          chartConfig={{ type: 'bar' }}
          group="vtex"
        />
        <Chart
          series={{ name: 'AAAA', data: [9, 7, 7, 5, 0, 10, 5, 9, 4, 3] }}
          chartConfig={{ type: 'line' }}
          group="vtex"
        />
        <Chart
          series={{ name: 'AAAA', data: [2, 4, 6, 7, 9, 0, 8, 6, 4] }}
          chartConfig={{ type: 'bar' }}
          group="vtex"
        />
        <Chart
          series={{ name: 'AAAA', data: [1, 2, 3, 4, 5, 6, 7, 8, 9] }}
          chartConfig={{ type: 'line' }}
          group="vtex"
        />
        <Chart
          series={{ name: 'AAAA', data: [9, 8, 7, 6, 5, 4, 3, 2, 1] }}
          chartConfig={{ type: 'bar' }}
          group="vtex"
        />
        <Chart
          series={{ name: 'AAAA', data: [2, 4, 6, 7, 9, 0, 8, 6, 4] }}
          chartConfig={{ type: 'line' }}
          group="vtex"
        />
        <Chart
          series={{ name: 'AAAA', data: [9, 7, 7, 5, 0, 10, 5, 9, 4, 3] }}
          chartConfig={{ type: 'bar' }}
          group="vtex"
        />
        <Chart
          series={{ data: [2, 4, 6, 7, 9, 0, 8, 6, 4] }}
          chartConfig={{ type: 'line' }}
          group="vtex"
        />
      </>
    )
  },
}

export const ZoomExample: Story = {
  render: () => {
    const [Zoom, setZoom] = useState<boolean>(true)
    const [key, setKey] = useState<boolean>(true)
    return (
      <>
        <Button
          onClick={() => {
            const nZoom = !Zoom
            setZoom(nZoom)
            const nKey = !key
            setKey(nKey)
          }}
        >
          Botao do Zoom
        </Button>
        <Chart
          key={`${key}`}
          style={{ height: 550 }}
          series={[
            { data: [3, 4, 8, 8, 5, 4, 10, 9, 2, 7, 6, 3, 9, 2, 3] },
            { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5] },
            { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5] },
            { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5] },
            { data: [5, 4, 5, 9, 6, 8, 7, 2, 8, 5, 3, 9, 4, 9, 5] },
          ]}
          chartConfig={{ type: 'area', variant: 'stacked' }}
          zoom={Zoom}
        />
      </>
    )
  },
}
