import { describe, it, expect } from 'vitest'
import renderer from 'react-test-renderer'
import { Chart } from '../components'
import React from 'react'

describe('Snapshot de Gráficos de Linha', () => {
  it('Snapshot - Basic', () => {
    const tree = renderer
      .create(
        <Chart
          option={{
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            series: {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
          }}
          chartConfig={{ type: 'line' }}
          style={{ height: 550 }}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Snapshot - MultiLines', () => {
    const tree = renderer
      .create(
        <Chart
          option={{
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            series: [
              {
                name: 'Email',
                type: 'line',
                data: [120, 132, 101, 134, 90, 230, 210],
              },
              {
                name: 'Union Ads',
                type: 'line',
                data: [220, 182, 191, 234, 290, 330, 310],
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
              {
                name: 'Search Engine',
                type: 'line',
                data: [820, 932, 901, 934, 1290, 1330, 1320],
              },
            ],
          }}
          chartConfig={{ type: 'line' }}
          style={{ height: 550 }}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Snapshot - Stacked', () => {
    const tree = renderer
      .create(
        <Chart
          option={{
            xAxis: {
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            series: [
              {
                name: 'Email',
                type: 'line',
                stack: 'Total',
                data: [120, 132, 101, 134, 90, 230, 210],
              },
              {
                name: 'Union Ads',
                type: 'line',
                stack: 'Total',
                data: [220, 182, 191, 234, 290, 330, 310],
              },
              {
                name: 'Video Ads',
                type: 'line',
                stack: 'Total',
                data: [150, 232, 201, 154, 190, 330, 410],
              },
              {
                name: 'Direct',
                type: 'line',
                stack: 'Total',
                data: [320, 332, 301, 334, 390, 330, 320],
              },
              {
                name: 'Search Engine',
                type: 'line',
                stack: 'Total',
                data: [820, 932, 901, 934, 1290, 1330, 1320],
              },
            ],
          }}
          chartConfig={{ type: 'line' }}
          style={{ height: 550 }}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Snapshot - Dashed', () => {
    const tree = renderer
      .create(
        <Chart
          option={{
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            series: {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              lineStyle: { type: 'dashed' },
            },
          }}
          chartConfig={{ type: 'line' }}
          style={{ height: 550 }}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
