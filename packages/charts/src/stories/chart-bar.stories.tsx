import React from 'react'
import { Chart } from '../index'

export default {
  title: 'charts/bar',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}

export function Basic() {
  return (
    <Chart
      style={{
        height: 560,
      }}
      option={{
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
          },
        ],
      }}
    />
  )
}

export function Fancy() {
  const xAxisData: string[] = []
  const data1: number[] = []
  const data2: number[] = []

  for (let i = 0; i < 100; i++) {
    xAxisData.push(`A${i}`)
    data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
    data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
  }

  return (
    <Chart
      style={{
        height: 560,
      }}
      option={{
        title: {
          text: 'Bar Animation Delay',
        },
        legend: {
          data: ['bar', 'bar2'],
        },
        toolbox: {
          // y: 'bottom',
          feature: {
            magicType: {
              type: ['stack'],
            },
            dataView: {},
            saveAsImage: {
              pixelRatio: 2,
            },
          },
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false,
          },
        },
        yAxis: {},
        series: [
          {
            name: 'bar',
            type: 'bar',
            data: data1,
            emphasis: {
              focus: 'series',
            },
            animationDelay(idx) {
              return idx * 10
            },
          },
          {
            name: 'bar2',
            type: 'bar',
            data: data2,
            emphasis: {
              focus: 'series',
            },
            animationDelay(idx) {
              return idx * 10 + 100
            },
          },
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate(idx) {
          return idx * 5
        },
      }}
    />
  )
}
