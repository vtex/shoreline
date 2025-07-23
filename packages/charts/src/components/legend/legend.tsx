import { isArray, isString } from 'lodash'
import { type ComponentPropsWithoutRef, useMemo } from 'react'
import { defaultColorPreset } from '../../theme/colors'
import type { EChartsOption } from 'echarts'
import '../../theme/components/legend.css'

export const Legend = (props: LegendProps) => {
  const { series, selected, onClick, ...otherProps } = props

  if (!series) return
  if (!isArray(series)) return

  /**
   * Makes an array of colors to track the colors of each serie
   */
  const colors = useMemo(() => {
    const colorsOut: string[] = []
    let index = 0
    series.forEach((serie) => {
      if (!serie.color) {
        colorsOut.push(defaultColorPreset[index])
        index++
      } else {
        if (isString(serie.color)) colorsOut.push(serie.color)
        else colorsOut.push(serie.color[0])
      }
    })
    return colorsOut
  }, [series])

  return (
    <div data-sl-chart-legend {...otherProps}>
      {series.map((serie, i) => {
        if (!serie.name) return
        return (
          <div key={i} data-sl-chart-legend-container>
            <button
              data-sl-chart-legend-button
              onClick={() => onClick(String(serie.name))}
              style={{
                backgroundColor: colors[i],
              }}
            />
            <span
              onClick={() => onClick(String(serie.name))}
              data-sl-chart-legend-text
            >
              {serie.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export type LegendOptions = {
  series: EChartsOption['series']
  onClick: (name: string) => void
  selected?: boolean[]
}

export type LegendProps = LegendOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>
