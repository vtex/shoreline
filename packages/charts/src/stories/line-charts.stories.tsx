import type { StoryObj } from '@storybook/react'
import { Chart } from '../index'

export default {
  title: 'Charts/line',
  component: Chart,
}

type Story = StoryObj<typeof Chart>

export const Basic: Story = {
  args: {
    series: { data: [820, 932, 901, 934, 1290, 1330, 1320] },
    xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    chartConfig: { type: 'line' },
    style: { height: 550 },
  },
}
export const MultiLines: Story = {
  args: {
    xAxis: { data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    chartConfig: { type: 'line' },
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
    style: { height: 550 },
  },
}

export const Dashed: Story = {
  args: {
    chartConfig: { type: 'line' },
    style: { height: 550 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    series: {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      lineStyle: { type: 'dashed' },
    },
  },
}

export const ConfienceBand: Story = {
  args: {
    chartConfig: { type: 'line' },
    style: { height: 550 },
    zoom: true,
    xAxis: {
      type: 'category',
      data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        name: 'média',
        data: [1500, 6700, 8000, 1200, 7600, 9000, 2900, 8500, 1100, 200],
        markPoint: {
          data: [
            { name: 'min', coord: [9, 200], itemStyle: { color: '#EC3727' } },
            {
              name: 'max',
              coord: [5, 9000],
              itemStyle: { color: '#9C56F3' },
            },
          ],
        },
      },
      {
        type: 'line',
        name: 'limite inferior',
        data: [1823, 3671, 2530, 2000, 3927, 2186, 4000, 3370, 1500, 2895],
        stack: 'confidence band',
        lineStyle: { opacity: 0 },
      },
      {
        type: 'line',
        name: 'limite superior',
        data: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 3000, 5000, 5000],
        stack: 'confidence band',
        areaStyle: { color: 'grey', opacity: 0.3 },
        lineStyle: { opacity: 0 },
      },
    ],

    option: {
      tooltip: {
        trigger: 'axis',
      },
      visualMap: {
        show: false,
        min: 1000,
        max: 9000,
        inRange: { color: ['#EC3727', '#157BF4', '#9C56F3'] },
      },
    },
  },
}
export const GradientArea: Story = {
  render: () => {
    return (
      <Chart
        chartConfig={{ type: 'line' }}
        style={{ height: 550 }}
        zoom
        xAxis={{
          type: 'category',
          data: [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
          ],
        }}
        series={[
          {
            data: [
              543, 287, 892, 1050, 176, 732, 954, 611, 399, 1085, 224, 777,
              1023, 465, 918,
            ],
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#97CFFE',
                  },
                  {
                    offset: 1,
                    color: '#FFFFFF',
                  },
                ],
              },
              opacity: 0.5,
            },
            emphasis: { disabled: true },
          },
        ]}
      />
    )
  },
}

export const TesteInitialArea: Story = {
  render: () => {
    return (
      <Chart
        series={[{ data: [1, 2, 3, 2, 1] }, { data: [3, 2, 1, 2, 3] }]}
        chartConfig={{ type: 'line', variant: 'area' }}
      />
    )
  },
}
