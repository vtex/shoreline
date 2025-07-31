import { isArray, isString } from 'lodash'
import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { defaultColorPreset } from '../../theme/colors'
import type { EChartsOption } from 'echarts'
import '../../theme/components/legend.css'
import { checkAllSelected } from '../../utils/legend'
import type ReactECharts from 'echarts-for-react'
import { LegendItem } from './legend-item'

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

    const [seriesState, setSeriesState] = useState<LegendState>(initialState)

    /**
     * Makes an array of colors to track the colors of each serie
     */
    const colors = useMemo(() => {
      let index = 0
      return series.map((serie) => {
        if (!serie.color) {
          return defaultColorPreset[index++]
        }
        if (isString(serie.color)) return serie.color
        return serie.color[0]
      })
    }, [series, seriesState])

    /**
     * Functions that changes the state of the legend.
     * Based on the type of action and the index of the change,
     * the legend can decide  what is the next state to be rendered.
     *
     * It is a pure function in a way that it does not modify the old state, and a new one is created
     * Also returns the new legend state when its called.
     *
     * @param {number} index - Index of the serie to change the state.
     * @param {string} type - Type of action to perform. Can be 'toggle', 'selectAll' or 'exclusive'.
     * @returns {LegendState} The new state of the legend.
     */
    const changeState = useCallback(
      (index: number, type: LegendAction['type']) => {
        const newState = [...seriesState] as LegendState
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
          changeState(index, action as LegendAction['type'])
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
        const checked: string[] = []
        newState.forEach((serie) => {
          if (serie.state === true) on.push(serie.serie)
          else if (serie.state === false) off.push(serie.serie)
          else checked.push(serie.serie)
        })

        let action = ''
        if (checked.length !== 0) {
          action = 'exclusive'
        } else if (on.length === 1 && on[0] === name) {
          action = 'selectAll'
        } else {
          action = 'toggle'
        }

        const settedState = changeState(index, action as LegendAction['type'])

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
              selected={seriesState[index].state}
              color={colors[index]}
              index={index}
            />
          )
        })}
      </div>
    )
  }
)

export type LegendState =
  | { serie: string; state: boolean }[]
  | { serie: string; state: undefined }[]

export type LegendAction = {
  index: number
  name: string
  type: 'toggle' | 'selectAll' | 'exclusive'
  state: LegendState
  chartId: string
}

export type LegendHandle = {
  setState: (index: number, action: string) => void
}

type LegendOptions = {
  series: EChartsOption['series']
  chartRef: React.RefObject<ReactECharts>
}

type LegendProps = LegendOptions &
  Omit<ComponentPropsWithoutRef<'div'>, 'onClick'>
