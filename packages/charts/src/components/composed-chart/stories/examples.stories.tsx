import { LocaleProvider } from '@vtex/shoreline'

import { ComposedChart } from '../index'
import '../../../styles.css'

export default {
  title: 'charts/composed-chart',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const revenue = [4200, 5100, 4800, 6300, 5900, 7200]
const cost = [2100, 2400, 2600, 2900, 2700, 3100]
const refunds = [-900, -1200, -800, -1400, -1100, -700]
const conversion = [2.1, 2.4, 2.3, 2.8, 2.6, 3.1]

/**
 * The everyday composed chart: bars for the magnitude, a line for a rate
 * measured on a different unit. The units differ, so the line reads against an
 * inferred right axis without the consumer choosing one.
 */
export function BarsWithPercentageLine() {
  return (
    <ComposedChart
      label="Revenue and conversion rate by month"
      categories={months}
      series={[
        { type: 'bar', name: 'Revenue', data: revenue },
        {
          type: 'line',
          name: 'Conversion',
          data: conversion,
          unit: 'percentage',
        },
      ]}
    />
  )
}

/**
 * Two bar series on the left axis and a percentage line on the right: bars
 * stack, lines always paint above them.
 */
export function StackedBarsWithLine() {
  return (
    <ComposedChart
      label="Revenue, cost and conversion rate by month"
      grouping="stacked"
      categories={months}
      series={[
        { type: 'bar', name: 'Revenue', data: revenue },
        { type: 'bar', name: 'Cost', data: cost },
        {
          type: 'line',
          name: 'Conversion',
          data: conversion,
          unit: 'percentage',
        },
      ]}
    />
  )
}

/**
 * Bars on both sides of zero: the zero line is emphasized so the split between
 * revenue and refunds stays legible, while every other gridline — the bottom
 * one included — keeps the quiet grid tone.
 */
export function NegativeValues() {
  return (
    <ComposedChart
      label="Revenue, refunds and conversion rate by month"
      categories={months}
      series={[
        { type: 'bar', name: 'Revenue', data: revenue },
        { type: 'bar', name: 'Refunds', data: refunds },
        {
          type: 'line',
          name: 'Conversion',
          data: conversion,
          unit: 'percentage',
        },
      ]}
    />
  )
}

/**
 * A forecast line continuing the history line, overlaid on the bars. The line
 * keeps the line chart's treatment: dashed, symbol-free, joined at the last
 * known value.
 */
const forecastMonths = [...months, 'Jul', 'Aug']
const revenueHistory = [...revenue, null, null]
const revenueForecast = [null, null, null, null, null, null, 8100, 7600]

export function BarsWithForecastLine() {
  return (
    <ComposedChart
      label="Revenue by month, with a two-month forecast"
      categories={forecastMonths}
      series={[
        { type: 'bar', name: 'Revenue', data: revenueHistory },
        { type: 'line', name: 'Trend', data: revenueHistory },
        {
          type: 'line',
          name: 'Forecast',
          data: revenueForecast,
          variant: 'forecast',
        },
      ]}
    />
  )
}

/**
 * No lines, so the composite renders exactly like a bar chart — including its
 * single value axis.
 */
export function BarsOnly() {
  return (
    <ComposedChart
      label="Revenue and cost by month"
      categories={months}
      series={[
        { type: 'bar', name: 'Revenue', data: revenue },
        { type: 'bar', name: 'Cost', data: cost },
      ]}
    />
  )
}

/**
 * No bars, so the composite renders exactly like a line chart.
 */
export function LinesOnly() {
  return (
    <ComposedChart
      label="Revenue and cost by month"
      categories={months}
      series={[
        { type: 'line', name: 'Revenue', data: revenue },
        { type: 'line', name: 'Cost', data: cost },
      ]}
    />
  )
}

/**
 * Marker thinning is measured in pixels, not in point count: this 60-day
 * series sits in a card-width column, so the line's markers are dropped so the
 * trend reads as a line. Bars keep their own geometry, and an isolated reading
 * between gaps keeps a marker so it does not vanish with the line.
 */
export function Crowded() {
  return (
    <div style={{ width: 420 }}>
      <ComposedChart
        label="Daily revenue and visits, 60-day trend"
        categories={Array.from({ length: 60 }, (_, i) => `D${i + 1}`)}
        series={[
          {
            type: 'bar',
            name: 'Revenue',
            data: Array.from({ length: 60 }, (_, i) => 100 + (i % 7)),
          },
          {
            type: 'line',
            name: 'Visits',
            data: Array.from({ length: 60 }, (_, i) =>
              i < 20 ? 180 + (i % 11) : i === 35 ? 240 : null
            ),
          },
        ]}
      />
    </div>
  )
}

export function Loading() {
  return (
    <ComposedChart
      label="Revenue and conversion rate by month"
      loading
      categories={months}
      series={[
        { type: 'bar', name: 'Revenue', data: revenue },
        {
          type: 'line',
          name: 'Conversion',
          data: conversion,
          unit: 'percentage',
        },
      ]}
    />
  )
}

export function Empty() {
  return (
    <ComposedChart
      label="Revenue and conversion rate by month"
      categories={[]}
      series={[]}
      messages={{ empty: 'No data for the selected period' }}
    />
  )
}

/**
 * Internal messages — the empty state and the "Others" aggregate — localize
 * from the surrounding `LocaleProvider`. Bar series past `maxSeries` fold into
 * the aggregate; lines are never aggregated.
 */
export function Localized() {
  return (
    <LocaleProvider locale="pt-BR">
      <ComposedChart
        label="Vendas e conversão por mês"
        categories={['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']}
        series={[
          {
            type: 'bar',
            name: 'Website',
            data: [2300, 2900, 2500, 3400, 3100, 3800],
          },
          {
            type: 'bar',
            name: 'Marketplace',
            data: [1200, 1400, 1500, 1800, 1900, 2200],
          },
          {
            type: 'bar',
            name: 'Loja física',
            data: [700, 800, 800, 1100, 900, 1200],
          },
          { type: 'bar', name: 'Social', data: [300, 350, 400, 500, 450, 600] },
          {
            type: 'line',
            name: 'Conversão',
            data: conversion,
            unit: 'percentage',
          },
        ]}
      />
    </LocaleProvider>
  )
}
