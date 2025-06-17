import { defaultColorPreset } from '../theme/colors'

export function createLegendVisuals(
  points: [number, number][],
  selected?: boolean[]
): echarts.GraphicComponentOption[] {
  return points.map((point, i) => {
    const isSelected = selected ? selected[i] : true
    const color = isSelected ? defaultColorPreset[i] : 'var(--sl-color-bg-base)'
    console.log('criando')
    return {
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
        e.target.attr({ style: { fill: 'var(--sl-color-teal-10)' } })
      },
      onmouseout(e) {
        e.target.attr({ style: { fill: color } })
      },
    }
  })
}
