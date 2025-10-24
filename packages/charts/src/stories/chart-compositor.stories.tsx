import type { StoryObj } from '@storybook/react'
import { ChartCompositor } from '../index'
import { CHART_COMPOSITOR_DATA } from '../benchmarks/__fixtures__/chartData'
import { Button } from '@vtex/shoreline'
import { useState } from 'react'

export default {
  title: 'Charts/chart-compositor',
  component: ChartCompositor,
}

type Story = StoryObj<typeof ChartCompositor>

const data1: number[] = []
const data2: number[] = []
const data3: number[] = []

for (let i = 0; i < 25; i++) {
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
  data3.push((data1[i] + data2[i]) / 2)
}
export const Basic: Story = {
  args: {
    charts: [
      {
        series: { data: data1, name: 'Bar 1' },
        chartConfig: { type: 'bar', gap: 1 },
      },
      {
        series: {
          data: data2,
          name: 'Bar 2',
        },
        chartConfig: { type: 'bar' },
      },
      {
        series: {
          data: data3,
          name: 'Average',
        },
        chartConfig: { type: 'line' },
      },
    ],
    tooltip: { type: 'line' },
    style: { height: 550 },
  },
}

export const Stress: Story = {
  args: {
    charts: [
      {
        series: { data: CHART_COMPOSITOR_DATA.data4_thousand },
        chartConfig: { type: 'line' },
      },
      {
        series: { data: CHART_COMPOSITOR_DATA.data4_thousand },
        chartConfig: { type: 'bar' },
      },
      {
        series: { data: CHART_COMPOSITOR_DATA.data4_thousand },
        chartConfig: { type: 'bar' },
      },
    ],
    tooltip: { type: 'line' },
  },
}
export const Loading: Story = {
  render: () => {
    const [charts, setCharts] = useState<any>([])
    const [isLoading, setIsLoading] = useState(true)

    return (
      <>
        <Button
          style={{ marginBottom: 'var(--sl-space-2)' }}
          variant={'primary'}
          onClick={() => {
            if (isLoading) {
              setCharts([
                {
                  series: { data: [1, 2, 3, 4, 5] },
                  chartConfig: { type: 'bar' },
                },
                {
                  series: { data: [1, 3, 2, 5, 4] },
                  chartConfig: { type: 'line' },
                },
              ])
              setIsLoading(false)
            } else {
              setIsLoading(true)
            }
          }}
        >
          {isLoading ? 'Finish Loading' : 'Unload'}
        </Button>
        <ChartCompositor
          charts={charts}
          tooltip={{ type: 'line' }}
          xAxis={{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          }}
          yAxis={{ type: 'value', splitLine: { show: true } }}
          loading={isLoading}
          loadingOptions={{ numColumns: 5 }}
        />
      </>
    )
  },
}
export const Sunburst: Story = {
  args: {
    style: { height: 500 },
    tooltip: { type: 'funnel' },
    // option: { grid: { top: '55%' } },
    charts: [
      { series: { data: data1.slice(15, 24) }, chartConfig: { type: 'bar' } },
      {
        series: { data: data2.slice(15, 24).map((v) => v / 3) },
        chartConfig: { type: 'bar' },
      },
      {
        chartConfig: { type: 'sunburst' },
        series: {
          center: ['15%', '35%'],
          radius: '70%',
          label: { fontSize: 11 },
          data: [
            {
              name: '​奶​奶',
              children: [
                {
                  name: '刘',
                  value: 15,
                  children: [
                    {
                      name: '你抠死了',
                      value: 2,
                    },
                    {
                      name: '表姐',
                      value: 5,
                      children: [
                        {
                          name: '儿子',
                          value: 2,
                        },
                      ],
                    },
                    {
                      name: '表哥',
                      value: 4,
                    },
                  ],
                },
                {
                  name: '爸爸',
                  value: 10,
                  children: [
                    {
                      name: '我',
                      value: 5,
                    },
                    {
                      name: '​弟​弟',
                      value: 1,
                    },
                  ],
                },
              ],
            },
            {
              name: 'Nan',
              children: [
                {
                  name: 'Nico',
                  children: [
                    {
                      name: 'Betty',
                      value: 4,
                    },
                    {
                      name: 'Jenny',
                      value: 2,
                    },
                  ],
                },
              ],
            },
            {
              name: 'Ramon',
              children: [
                {
                  name: 'Katya',
                  children: [
                    { name: 'Trix', value: 9 },
                    { name: 'Bosco', value: 5 },
                  ],
                },
              ],
            },
          ],
        },
      },
    ],
  },
}
