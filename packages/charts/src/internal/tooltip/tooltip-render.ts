import type {
  ChartTooltipData,
  ChartTooltipRow,
  ChartTooltipVariation,
} from './tooltip-model'

// The Figma "ChartTooltip" variation arrow — a filled triangle rotated by
// CSS for the 'down' direction (tooltip.md row model).
const variationIconPath =
  'M3.34935 0.470001C3.74102 -0.156668 4.65368 -0.156667 5.04535 0.470002L8.2411 5.58321C8.65738 6.24925 8.17854 7.1132 7.3931 7.1132H1.0016C0.216164 7.1132 -0.262679 6.24925 0.153601 5.58321L3.34935 0.470001Z'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderVariation(variation: ChartTooltipVariation): string {
  const tone = variation.tone ?? 'neutral'
  const icon =
    variation.direction === 'flat'
      ? ''
      : `<svg data-sl-chart-tooltip-row-variation-icon viewBox="0 0 8.3947 7.1132" aria-hidden="true"><path d="${variationIconPath}" fill="currentColor" /></svg>`

  return `<span data-sl-chart-tooltip-row-variation data-direction="${variation.direction}" data-tone="${tone}"><span data-sl-chart-tooltip-row-variation-value>${escapeHtml(variation.value)}</span>${icon}</span>`
}

function renderRow(row: ChartTooltipRow): string {
  const line = row.color
    ? `<span data-sl-chart-tooltip-row-line style="background-color:${escapeHtml(row.color)}"></span>`
    : ''

  return `<div data-sl-chart-tooltip-row>${line}<div data-sl-chart-tooltip-row-content><span data-sl-chart-tooltip-row-label>${escapeHtml(row.label)}</span><span data-sl-chart-tooltip-row-value-group><span data-sl-chart-tooltip-row-value>${escapeHtml(row.value)}</span>${row.variation ? renderVariation(row.variation) : ''}</span></div></div>`
}

/**
 * Renders the tooltip row model to an HTML string for the engine's tooltip
 * `formatter`. The engine mounts this markup in its
 * own floating DOM node outside the React tree, so it is styled entirely
 * through the `data-sl-chart-tooltip*` hooks in `tooltip.css` — the only way
 * this DOM-rendered part reaches `--sl-*` tokens, per FR-007.
 */
export function renderChartTooltip(data: ChartTooltipData): string {
  if (data.rows.length === 0) return ''

  const title = data.title
    ? `<div data-sl-chart-tooltip-title>${escapeHtml(data.title)}</div>`
    : ''
  const rows = data.rows.map(renderRow).join('')

  return `<div data-sl-chart-tooltip>${title}<div data-sl-chart-tooltip-rows>${rows}</div></div>`
}
