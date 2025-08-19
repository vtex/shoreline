import { random } from 'lodash'
import { Chart, ChartCompositor } from '../index'
import type { StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button, Grid } from '@vtex/shoreline'
import type { EChartsOption, SeriesOption } from 'echarts'

export default {
  title: 'Charts/general',
  component: Chart,
}

type Story = StoryObj<typeof Chart>
export const BasicSync: Story = {
  render: () => {
    return (
      <>
        <Chart
          series={[
            { data: [1, 2, 3], name: 'Seg' },
            { data: [3, 4, 5], name: 'Ter' },
            { data: [5, 1, 2], name: 'Qua' },
            { data: [2, 5, 1], name: 'Qui' },
          ]}
          chartConfig={{ type: 'bar' }}
          group="a"
        />
        <Chart
          series={[
            { data: [3, 4, 5], name: 'Seg' },
            { data: [1, 2, 3], name: 'Ter' },
            { data: [5, 1, 2], name: 'Qua' },
          ]}
          chartConfig={{ type: 'bar' }}
          group="a"
        />
      </>
    )
  },
}

export const TimeAxis: Story = {
  args: {
    chartConfig: { type: 'line' },
    xAxis: { type: 'time' },
    locale: 'zh',
    series: [
      {
        //biome-ignore format: matrix
        data: [
          [new Date('2025-01-01'), 10],
          [new Date('2025-05-01'), 11],
          [new Date('2025-10-01'), 12],
        ],
        name: 'Hehe',
      },
      {
        //biome-ignore format: matrix
        data: [
          [new Date('2025-01-01'), 20],
          [new Date('2025-05-01'),  9],
          [new Date('2025-10-01'), 15],
        ],
        name: 'hihi',
      },
      {
        //biome-ignore format: matrix
        data: [
          [new Date('2025-01-01'), 18],
          [new Date('2025-05-01'), 19],
          [new Date('2025-10-01'), 17],
        ],
        name: 'hoho',
      },
      //biome-ignore format: matrix
      // {
      //  data: [
      // {name: new Date('2025-01-01').toLocaleDateString("zh", options), value:[new Date('2025-01-02'),20]},
      //     {name: new Date('2025-05-01').toLocaleDateString("pt-br", options), value:[new Date('2025-05-01'),9]},
      //     {name: new Date('2025-10-01').toString(), value:[new Date('2025-10-01'),15]},
      //   ],
      //   name: 'Hihi',
      // },
      // //biome-ignore format: matrix
      // {
      //   data: [
      //     {name: new Date('2025-01-01').toLocaleDateString("zh", options), value:[new Date('2025-01-02'), 18]},
      //     {name: new Date('2025-05-01').toLocaleDateString("pt-br", options), value:[new Date('2025-05-01'), 19]},
      //     {name: new Date('2025-10-01').toString(), value:[new Date('2025-10-01'), 17]},
      //   ],
      //   name: 'Haha',
      // },
    ],
    style: { width: '600px' },
  },
}

export const AnimationUpdateFunctions: Story = {
  render: () => {
    const axis = { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }
    // biome-ignore format:
    const series: SeriesOption[] = [
        { name: 'Email', type: 'line', data: [120, 132, 101, 134, 90, 230, 210] },
        { name: 'Union Ads', type: 'line', data: [220, 182, 191, 234, 290, 330, 260] },
        { name: 'Video Ads', type: 'line', data: [150, 232, 201, 154, 190, 330, 410] },
        { name: 'Direct', type: 'line', data: [320, 332, 301, 334, 390, 330, 320] },
    ]
    // biome-ignore format:
    const data: { title: EChartsOption['title']; option: EChartsOption }[] = [
      { title: { text: 'CubicInOut' }, option: { animationEasingUpdate: 'cubicInOut' }},
      { title: { text: 'SinusoidalInOut',}, option: { animationEasingUpdate: 'sinusoidalInOut' }},
      { title: { text: 'QuinticInOut' }, option: { animationEasingUpdate: 'quinticInOut' }},
      { title: { text: 'CircularInOut' }, option: { animationEasingUpdate: 'circularInOut' }},
    ]

    return (
      <Grid columns={'50% 50%'} rows={'50% 50%'} style={{ width: 1000 }}>
        {data.map((chart: any) => (
          <Chart
            key={chart.title.text}
            xAxis={axis}
            title={chart.title}
            chartConfig={{ type: 'line' }}
            series={series}
            option={chart.option}
            group="A"
          />
        ))}
      </Grid>
    )
  },
}

export const SyncWithCompositor: Story = {
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
          style={{ height: 500 }}
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
export const Loading: Story = {
  args: {
    series: [],
    xAxis: {},
    chartConfig: { type: 'area' },
    loading: true,
  },
}
