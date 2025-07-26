import { isArray, isString } from 'lodash'
import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import { defaultColorPreset } from '../../theme/colors'
import type { EChartsOption, SeriesOption } from 'echarts'
import '../../theme/components/legend.css'
import { getHoverColor } from '../../utils/legend'
import { IconCheckSmall } from '@vtex/shoreline'
import type ReactECharts from 'echarts-for-react'

export const Legend = (props: LegendProps): ReactNode => {
  const { series, chartRef, ...otherProps } = props

  if (!series) return
  if (!isArray(series)) return

  const initialState: { serie: string; state: boolean | undefined }[] = []
  series.forEach((serie) => {
    if (serie.name)
      initialState.push({ serie: String(serie.name), state: undefined })
  })

  const [seriesState, setseriesState] =
    useState<{ serie: string; state: boolean | undefined }[]>(initialState)

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
  }, [series, seriesState])

  const onClick = useCallback(
    (name: string) => {
      if (!chartRef.current) return
      const chart = chartRef.current.getEchartsInstance()
      const index = seriesState.findIndex((serie) => serie.serie === name)
      const newState = [...seriesState]

      const on: string[] = []
      const off: string[] = []
      const un: string[] = []
      seriesState.forEach((serie) => {
        if (serie.state === true) on.push(serie.serie)
        if (serie.state === false) off.push(serie.serie)
        if (serie.state === undefined) un.push(serie.serie)
      })

      let action = ''
      if (un.length !== 0) {
        newState.forEach((serie, i) => {
          action = 'exclusive'
          if (index === i) serie.state = true
          else serie.state = false
        })
      } else if (on.length === 1 && on[0] === name) {
        action = 'selectAll'
        newState.forEach((serie) => {
          serie.state = undefined
        })
      } else {
        action = 'toggle'
        if (off.length === 1 && off[0] === name)
          newState.forEach((serie) => {
            serie.state = undefined
          })
        else newState[index].state = !newState[index].state
      }
      setseriesState(newState)
    },
    [seriesState, setseriesState]
  )

  return (
    <div data-sl-chart-legend {...otherProps} onClick={undefined}>
      {series.map((serie, index) => {
        return (
          <LegendItem
            key={index}
            serie={serie}
            onClick={onClick}
            selected={seriesState[index] ? seriesState[index].state : undefined}
            color={colors[index]}
            index={index}
          />
        )
      })}
    </div>
  )
}

export type LegendOptions = {
  series: EChartsOption['series']
  chartRef: React.RefObject<ReactECharts>
}

export type LegendProps = LegendOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>

function LegendItem({
  serie,
  onClick,
  selected,
  color,
  index,
  ...otherProps
}: LegendItemProps) {
  if (!serie.name) return
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [hover, setHover] = useState<boolean>(false)

  const backgroundColor = useMemo(() => {
    if (selected === false) return 'transparent'
    if (!hover) return color
    return getHoverColor(color)
  }, [selected, hover, color])

  const handleClick = useCallback(
    (_e: React.MouseEvent) => {
      onClick(String(serie.name))
    },
    [serie, buttonRef]
  )

  return (
    <div
      data-sl-chart-legend-container
      onClick={handleClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...otherProps}
    >
      <button
        ref={buttonRef}
        data-sl-chart-legend-button
        style={{
          backgroundColor: backgroundColor,
          border: selected !== false ? 'none' : 'var(--sl-border-base-strong)',
        }}
      >
        {selected === true ? (
          <IconCheckSmall data-sl-chart-legend-check />
        ) : null}
      </button>
      <span data-sl-chart-legend-text>{serie.name}</span>
    </div>
  )
}

type LegendItemOptions = {
  serie: SeriesOption
  onClick: (name: string) => void
  selected?: boolean
  color: string
  index: number
}

type LegendItemProps = LegendItemOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>
