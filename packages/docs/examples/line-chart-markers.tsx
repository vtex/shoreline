import { LineChart } from '@vtex/shoreline-charts'

export default function Example() {
  return (
    <div style={{ width: 420 }}>
      <LineChart
        label="Intermittent sensor readings, 90 days"
        categories={Array.from({ length: 90 }, (_, i) => String(i + 1))}
        series={[
          {
            name: 'Sensor A',
            data: Array.from({ length: 90 }, (_, i) =>
              i < 20 ? 120 + (i % 12) : i === 50 ? 180 : i === 75 ? 90 : null
            ),
          },
        ]}
      />
    </div>
  )
}
