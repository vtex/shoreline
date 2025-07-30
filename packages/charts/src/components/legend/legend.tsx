import { isArray, isString } from 'lodash'
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { defaultColorPreset } from '../../theme/colors'
import type { EChartsOption } from 'echarts'
import '../../theme/components/legend.css'
import { checkAllSelected, getHoverColor } from '../../utils/legend'
import { IconCheckSmall } from '@vtex/shoreline'
import type ReactECharts from 'echarts-for-react'

export const Legend = forwardRef<LegendHandle, LegendProps>(
  function Legend(props, ref) {
    const { series, chartRef, ...otherProps } = props

    if (!series) return
    if (!isArray(series)) return

    const initialState: { serie: string; state: undefined }[] = []
    series.forEach((serie) => {
      if (serie.name)
        initialState.push({ serie: String(serie.name), state: undefined })
    })

    const [seriesState, setSeriesState] =
      useState<LegendStateType>(initialState)

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

    /**
     * Functions that changes the state of the legend.
     * Based on the type of action and the index of the change,
     * the legend can decide  what is the next state to be rendered.
     *
     * It is a pure function, so the old state is not modified and a new one is created
     * Also returns the new legend state when its called.
     *
     * @param {number} index - Index of the serie to change the state.
     * @param {string} type - Type of action to perform. Can be 'toggle', 'selectAll' or 'exclusive'.
     * @returns {LegendStateType} The new state of the legend.
     */
    const changeState = useCallback(
      (index: number, type: LegendActionType['type']) => {
        const newState = [...seriesState] as LegendStateType
        if (type === 'selectAll') {
          newState.forEach((serie) => {
            serie.state = undefined
          })
        } else if (type === 'exclusive') {
          newState.forEach((serie, i) => {
            if (index !== i) serie.state = false
            else serie.state = true
          })
        } else {
          if (index >= seriesState.length)
            return setSeriesState(checkAllSelected(newState))
          newState[index].state = !newState[index].state
        }
        const checkedState = checkAllSelected(newState)
        setSeriesState(checkedState)
        return checkedState
      },
      [seriesState]
    )

    useImperativeHandle(
      ref,
      () => ({
        setState: (index: number, action: string) => {
          changeState(index, action as LegendActionType['type'])
        },
      }),
      [changeState]
    )

    const onClick = useCallback(
      (name: string) => {
        if (!chartRef.current) return
        const chart = chartRef.current.getEchartsInstance()
        const index = seriesState.findIndex((serie) => serie.serie === name)
        const newState = [...seriesState]

        const on: string[] = []
        const off: string[] = []
        const un: string[] = []
        newState.forEach((serie) => {
          console.log(serie.serie, serie.state)
          if (serie.state === true) on.push(serie.serie)
          if (serie.state === false) off.push(serie.serie)
          if (serie.state === undefined) un.push(serie.serie)
        })

        let action = ''
        if (un.length !== 0) {
          action = 'exclusive'
        } else if (on.length === 1 && on[0] === name) {
          action = 'selectAll'
        } else {
          action = 'toggle'
        }

        const settedState = changeState(
          index,
          action as LegendActionType['type']
        )

        chart.dispatchAction({
          type: 'legendToggleSelect',
          name: {
            index: index,
            type: action,
            state: settedState,
            chartId: chart.getId(),
          },
        })
      },
      [seriesState, chartRef]
    )

    return (
      <div data-sl-chart-legend {...otherProps} onClick={undefined}>
        {seriesState.map((serie, index) => {
          return (
            <LegendItem
              key={index}
              serie={serie.serie}
              onClick={onClick}
              selected={
                seriesState[index] ? seriesState[index].state : undefined
              }
              color={colors[index]}
              index={index}
            />
          )
        })}
      </div>
    )
  }
)

export type LegendStateType =
  | { serie: string; state: boolean }[]
  | { serie: string; state: undefined }[]

export type LegendActionType = {
  index: number
  name: string
  type: 'toggle' | 'selectAll' | 'exclusive'
  state: LegendStateType
  chartId: string
}

export type LegendHandle = {
  setState: (index: number, action: string) => void
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
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [hover, setHover] = useState<boolean>(false)

  const backgroundColor = useMemo(() => {
    if (selected === false) return 'transparent'
    if (!hover) return color
    return getHoverColor(color)
  }, [selected, hover, color])

  const handleClick = useCallback(
    (_e: React.MouseEvent) => {
      onClick(String(serie))
    },
    [serie, onClick]
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
      <span data-sl-chart-legend-text>{serie}</span>
    </div>
  )
}

type LegendItemOptions = {
  serie: string
  onClick: (name: string) => void
  selected?: boolean
  color: string
  index: number
}

type LegendItemProps = LegendItemOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>
