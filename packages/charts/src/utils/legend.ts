import { defaultColorPreset, defaultColorShade } from '../theme/colors'

export function createLegendVisuals(
  points: [number, number][],
  selected?: boolean[],
  checked = false
): echarts.GraphicComponentOption[] {
  return points.map((point, i) => {
    const isSelected = selected ? selected[i] : true
    const color = isSelected ? defaultColorPreset[i] : '#FFFFFF'

    return {
      type: 'group',
      id: `_group${i}`,
      onmouseover(e) {
        const border = e.target.parent._children[1]
        if (border.style.fill === '#FFFFFF') return
        border.attr({ style: { fill: '#ADADAD' } })
      },
      onmouseout(e: any) {
        // the public children property is empty here, but the private one isn't.
        const border = e.target.parent._children[1]
        if (border.style.fill === '#FFFFFF') return
        border.attr({ style: { fill: '#C2C2C2' } })
      },
      children: [
        {
          type: 'rect',
          info: point,
          shape: {
            x: point[0],
            y: point[1],
            width: 16,
            height: 16,
            r: 4,
          },
          id: `${i}`,
          z: 100,
          style: { fill: color },
          onmouseover(e) {
            e.target.attr({ style: { fill: getColorShade(color) } })
          },
          onmouseout(e: any) {
            e.target.attr({ style: { fill: color } })
          },
        },
        {
          type: 'rect',
          shape: {
            x: point[0] - 1,
            y: point[1] - 1,
            width: 18,
            height: 18,
            r: 5,
          },
          id: `${i}_border`,
          z: 99,
          style: {
            fill: color !== '#FFFFFF' ? '#FFFFFF' : '#C2C2C2',
          },
        },
        {
          type: 'polyline',
          silent: true,
          invisible: !checked,
          shape: {
            points: [
              [10, 70],
              [40, 95],
              [90, 35],
            ],
          },
          x: point[0] + 3,
          y: point[1] + 2,
          z: 101,
          scaleX: 0.1,
          scaleY: 0.1,
          style: {
            stroke: '#FFFFFF',
            lineWidth: 10,
            lineCap: 'round',
            lineJoin: 'round',
          },
        },
      ],
    }
  })
}

export function getColorShade(color: string) {
  if (color === '#FFFFFF') return '#FFFFFF'
  const index = defaultColorPreset.indexOf(color)
  return defaultColorShade[index]
}
export function turnOnAllLegend(chart: echarts.ECharts, series: string[]) {
  series.forEach((serie) => turnOnSerieLegend(chart, serie))
}

export function turnOnSerieLegend(chart: echarts.ECharts, serie: string) {
  chart.dispatchAction({ type: 'legendSelect', name: serie }, { silent: true })
}

export function turnOffSerieLegend(chart: echarts.ECharts, serie: string) {
  chart.dispatchAction(
    { type: 'legendUnSelect', name: serie },
    { silent: true }
  )
}

export function toggleSerieLegend(chart: echarts.ECharts, serie: string) {
  chart.dispatchAction(
    { type: 'legendToggleSelect', name: serie },
    { silent: true }
  )
}
