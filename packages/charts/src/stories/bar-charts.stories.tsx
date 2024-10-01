import React from 'react'
import { Chart } from '../index'
import { compactNumber } from '../utils/format'

export default {
  title: 'Charts/bar',
}

export function Basic() {
  return (
    <Chart
      option={{
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        series: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
      }}
      chartConfig={{ type: 'bar' }}
      style={{ height: 550 }}
    />
  )
}

export function LoadingCustom() {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState<{
    series: { data: number[] }[]
    labels: string[]
  }>({
    series: [{ data: [] }],
    labels: [],
  })

  setTimeout(() => {
    setLoading(false)
    setData({
      series: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    })
  }, 5000)

  return (
    <Chart
      option={{
        xAxis: {
          data: data.labels,
        },
        series: data.series,
      }}
      chartConfig={{ type: 'bar' }}
      style={{ height: 550 }}
      loading={loading}
      loadingConfig={{
        text: 'Carregando...',
      }}
    />
  )
}

export function BasicMultiSeries() {
  return (
    <Chart
      option={{
        xAxis: {
          data: ['Mon', 'Tue', 'Wed'],
        },
        series: [
          { data: [3, 2, 3], name: 'Series 1' },
          { data: [1, 4, 2], name: 'Series 2' },
          { data: [2, 1, 4], name: 'Series 3' },
        ],
      }}
      chartConfig={{ type: 'bar' }}
      style={{ height: 550 }}
    />
  )
}

export function HugeNumbers() {
  const numbers = [12344441, 62346346, 97346346]

  return (
    <Chart
      option={{
        xAxis: {
          data: ['Mon', 'Tue', 'Wed'],
        },
        yAxis: {
          axisLabel: {
            formatter: (value) => compactNumber(value),
          },
        },
        series: [
          {
            data: numbers,
            name: 'Series 1',
          },
        ],
      }}
      chartConfig={{ type: 'bar' }}
      style={{ height: 550 }}
    />
  )
}

export function Horizontal() {
  return (
    <Chart
      option={{
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        series: [
          { data: [1, 2, 3, 4, 5, 6, 7] },
          { data: [1, 4, 2, 1, 4, 3, 5] },
        ],
      }}
      chartConfig={{ type: 'bar', variant: 'horizontal' }}
      style={{ height: 550 }}
    />
  )
}

export function MultiType() {
  return (
    <Chart
      option={{
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        series: [
          { data: [1, 2, 3, 4, 5, 6, 7] },
          { data: [1, 4, 2, 1, 4, 3, 5], type: 'line' },
        ],
      }}
      chartConfig={{ type: 'bar', variant: 'default' }}
      style={{ height: 550 }}
    />
  )
}
