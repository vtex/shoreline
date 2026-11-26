import type { ReactNode } from 'react'

import type { ChartTooltipData } from '../tooltip-model'
import { buildAxisTooltipData } from '../tooltip-model'
import { renderChartTooltip } from '../tooltip-render'
import '../../../styles.css'

export default {
  title: 'charts/internal/chart-tooltip',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}

// Matches the Figma "ChartTooltip" reference frames' swatch colors directly,
// rather than resolved theme tokens — this story previews the row model in
// isolation, not a real chart's token-bridged palette.
const seriesColor = {
  blue: '#3993f4',
  purple: '#9c56f3',
  orange: '#ffa138',
  gray: '#858585',
}

/**
 * Renders `renderChartTooltip`'s output exactly as the engine does: as a raw
 * HTML string set on a plain element, not JSX (see ../tooltip-render.ts).
 */
function TooltipPreview(props: { data: ChartTooltipData }) {
  return (
    <div
      style={{ display: 'inline-block' }}
      dangerouslySetInnerHTML={{ __html: renderChartTooltip(props.data) }}
    />
  )
}

function Section(props: { label: string; children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        padding: '1rem 0',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <div style={{ width: '12rem', flexShrink: 0, fontSize: '0.75rem' }}>
        {props.label}
      </div>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {props.children}
      </div>
    </div>
  )
}

// The row model writes values through the caller's formatter — a chart passes
// the reader's locale. The story pins en-US so the capture does not change
// with the machine.
const formatValue = (value: number) =>
  new Intl.NumberFormat('en-US').format(value)

// The stack the total sections sum: a vertical stack draws its first series at
// the bottom, so its rows read bottom-up in the tooltip.
const stackedItems = [
  {
    name: 'Jun 05',
    seriesName: 'Website',
    value: 2500,
    color: seriesColor.blue,
    seriesIndex: 0,
    dataIndex: 5,
  },
  {
    name: 'Jun 05',
    seriesName: 'Marketplace',
    value: 1500,
    color: seriesColor.purple,
    seriesIndex: 1,
    dataIndex: 5,
  },
  {
    name: 'Jun 05',
    seriesName: 'Physical store',
    value: 800,
    color: seriesColor.orange,
    seriesIndex: 2,
    dataIndex: 5,
  },
]

export function Show() {
  return (
    <div>
      <Section label="Small (128px, no deltas)">
        <TooltipPreview
          data={{
            title: 'Jun 05',
            rows: [
              { label: 'Label', value: '139', color: seriesColor.blue },
              { label: 'Label', value: '143', color: seriesColor.purple },
              { label: 'Label', value: '503', color: seriesColor.orange },
            ],
          }}
        />
      </Section>

      <Section label="Max (268px, with deltas)">
        <TooltipPreview
          data={{
            title: 'Title',
            rows: [
              {
                label: 'Label',
                value: 'R$ 288.052.925,34',
                color: seriesColor.blue,
                delta: {
                  value: '00,00%',
                  direction: 'up',
                  tone: 'success',
                },
              },
              {
                label: 'Label',
                value: '000',
                color: seriesColor.purple,
                delta: { value: '0,00%', direction: 'up' },
              },
              {
                label: 'Label',
                value: '000',
                color: seriesColor.orange,
                delta: { value: '0,00%', direction: 'up' },
              },
              {
                label: 'Label',
                value: '000',
                color: seriesColor.gray,
                delta: { value: '0,00%', direction: 'up' },
              },
            ],
          }}
        />
      </Section>

      <Section label="Delta directions and tones">
        <TooltipPreview
          data={{
            rows: [
              {
                label: 'Up / success',
                value: '139',
                color: seriesColor.blue,
                delta: {
                  value: '12.4%',
                  direction: 'up',
                  tone: 'success',
                },
              },
            ],
          }}
        />
        <TooltipPreview
          data={{
            rows: [
              {
                label: 'Down / critical',
                value: '139',
                color: seriesColor.blue,
                delta: {
                  value: '8.1%',
                  direction: 'down',
                  tone: 'critical',
                },
              },
            ],
          }}
        />
        <TooltipPreview
          data={{
            rows: [
              {
                label: 'Flat / neutral',
                value: '139',
                color: seriesColor.blue,
                delta: { value: '0%', direction: 'flat' },
              },
            ],
          }}
        />
      </Section>

      <Section label="No title">
        <TooltipPreview
          data={{
            rows: [{ label: 'Revenue', value: '139', color: seriesColor.blue }],
          }}
        />
      </Section>

      <Section label="Row without a color swatch">
        <TooltipPreview
          data={{
            title: 'Jan',
            rows: [{ label: 'Revenue', value: '139' }],
          }}
        />
      </Section>

      <Section label="Long label and value (min/max width)">
        <TooltipPreview
          data={{
            title: 'A long category name that could wrap',
            rows: [
              {
                label: 'A fairly long series label',
                value: '1,234,567,890',
                color: seriesColor.blue,
              },
            ],
          }}
        />
      </Section>

      <Section label="Stacked, with the stack's total">
        <TooltipPreview
          data={buildAxisTooltipData(stackedItems, {
            // A vertical stack piles its first series at the bottom, so the
            // rows run bottom-up; the total closes the group it sums.
            reverse: true,
            // The total is a virtual row: no series of its own, so no swatch,
            // and it adds nothing to the legend or the palette.
            total: { label: 'Total', seriesCount: 3 },
            formatValue,
          })}
        />
      </Section>

      <Section label="Stacked, with a line after the bars">
        <TooltipPreview
          data={buildAxisTooltipData(
            [
              ...stackedItems,
              {
                name: 'Jun 05',
                seriesName: 'Conversion',
                value: 3.1,
                color: seriesColor.gray,
                seriesIndex: 3,
                dataIndex: 5,
              },
            ],
            {
              // Only the bars read bottom-up; the line drawn after them keeps
              // the series order and stays out of the sum.
              reverseUpTo: 3,
              total: { label: 'Total', seriesCount: 3 },
              formatValue,
            }
          )}
        />
      </Section>

      <Section label="Stacked, a summed series missing">
        <TooltipPreview
          data={buildAxisTooltipData(
            // Marketplace has no value at this category: its row drops out and
            // contributes nothing, rather than zeroing the sum.
            stackedItems.map((item) =>
              item.seriesIndex === 1 ? { ...item, value: null } : item
            ),
            {
              reverse: true,
              total: { label: 'Total', seriesCount: 3 },
              formatValue,
            }
          )}
        />
      </Section>
    </div>
  )
}
