import React from 'react'
import { Chart } from '../chart'

export default {
  title: 'charts/bar',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}

export function Basic() {
  return (
    <Chart
      option={{
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        series: { data: [1, 2, 3, 4, 5, 6, 7] },
      }}
      type="bar"
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
      type="bar"
      variant="horizontal"
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
      type="bar"
      variant="default"
      style={{ height: 550 }}
    />
  )
}
