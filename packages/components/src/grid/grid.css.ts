import { csx } from '@vtex/shoreline-vanilla-extract'

export const gridStyle = csx({
  '@layer': {
    components: {
      display: 'grid',
      gap: 'var(--sl-grid-gap)',
      rowGap: 'var(--sl-grid-rowGap)',
      columnGap: 'var(--sl-grid-columnGap)',
      gridTemplateAreas: 'var(--sl-grid-templateAreas)',
      gridTemplateRows: 'var(--sl-grid-templateRows)',
      gridTemplateColumns: 'var(--sl-grid-templateColumns)',
      gridAutoColumns: 'var(--sl-grid-autoColumns)',
      gridAutoRows: 'var(--sl-grid-autoRows)',
      gridAutoFlow: 'var(--sl-grid-autoFlow)',
    },
  },
})

export const gridCellStyle = csx({
  '@layer': {
    components: {
      gridColumnStart: 'var(--sl-grid-cell-columnStart)',
      gridColumnEnd: 'var(--sl-grid-cell-columnEnd)',
      gridRowStart: 'var(--sl-grid-cell-rowStart)',
      gridRowEnd: 'var(--sl-grid-cell-rowEnd)',
      gridColumn: 'var(--sl-grid-cell-column)',
      gridRow: 'var(--sl-grid-cell-row)',
      gridArea: 'var(--sl-grid-cell-area)',
    },
  },
})
