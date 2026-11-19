import { ComposedChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <div style={{ width: 420 }}>
      <ComposedChart
        label="Daily revenue and visits, 60-day trend"
        categories={Array.from({ length: 60 }, (_, i) => String(i + 1))}
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
