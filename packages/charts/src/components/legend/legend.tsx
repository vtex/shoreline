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

    const initialState: LegendState = []
    series.forEach((serie) => {
      if (serie.name)
        initialState.push({ serie: String(serie.name), state: 'unchecked' })
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
    }, [series])

    /**
     * Pure function that changes the state of the legend.
     * Based on the type of action and the index of the change,
     * the legend can decide what is the next state to be rendered.
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
            serie.state = 'unchecked'
          })
        } else if (type === 'exclusive') {
          newState.forEach((serie, i) => {
            if (index !== i) serie.state = 'off'
            else serie.state = 'checked'
          })
        } else {
          if (index >= seriesState.length)
            return setSeriesState(checkAllSelected(newState))
          newState[index].state =
            newState[index].state !== 'off' ? 'off' : 'checked'
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
          console.log(action)
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
          if (serie.state === 'checked') on.push(serie.serie)
          else if (serie.state === 'off') off.push(serie.serie)
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
          // repurposing this field for the extra info we need
          name: {
            index: index,
            type: action,
            state: settedState,
            chartId: chart.getId(),
          },
        })
      },
      [seriesState, chartRef, changeState]
    )

    return (
      <div data-sl-chart-legend {...otherProps} onClick={undefined}>
        {seriesState.map((serie, index) => {
          return (
            <LegendItem
              key={index}
              serie={serie.serie}
              onClick={onClick}
              state={seriesState[index].state}
              color={colors[index]}
              index={index}
            />
          )
        })}
      </div>
    )
  }
)

export type LegendState = LegendItemType[]

export type LegendItemType = {
  serie: string
  state: 'checked' | 'unchecked' | 'off'
}

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
