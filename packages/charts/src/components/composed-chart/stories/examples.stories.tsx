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
