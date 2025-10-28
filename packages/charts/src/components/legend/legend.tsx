import { isArray } from 'lodash'
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
import {
  changeBarRoundingExclusive,
  changeBarRoundingToogle,
  checkAllSelected,
} from '../../utils/legend'
import type ReactECharts from 'echarts-for-react'
import { LegendItem } from './legend-item'
import type { ChartConfig } from '../../types/chart'
import { Flex } from '@vtex/shoreline'

/**
 * A Chart's legend which can toggle series on and off.
 */
export const Legend = forwardRef<LegendHandle, LegendProps>((props, ref) => {
  const { series, chartRef, ...otherProps } = props

  if (!series) return

  if (!isArray(series)) return

  const initialState: LegendState = []
  series.forEach((serie) => {
    if (serie.name) {
      initialState.push({ serie: String(serie.name), state: 'unchecked' })
    }
  })

  const [seriesState, setSeriesState] = useState<LegendState>(initialState)

  /**
   * Makes an array of colors to track the colors of each serie.
   * Mimics echarts color picking behaviour, if a color is not set in the series
   * the next default color is picked.
   */
  const colors = useMemo(() => {
    let index = 0

    return series.map((serie) => {
      if (!serie.color) {
        return defaultColorPreset[index++]
      }
      // Echarts choses the first by default.
      if (Array.isArray(serie.color)) return serie.color[0]

      return serie.color
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
        if (index >= seriesState.length) {
          return setSeriesState(checkAllSelected(newState))
        }

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

      const seriesChecked: string[] = []
      const seriesUnchecked: string[] = []
      newState.forEach((serie) => {
        if (serie.state === 'checked') seriesChecked.push(serie.serie)
        else if (serie.state === 'unchecked') seriesUnchecked.push(serie.serie)
      })

      let actionType: LegendAction['type'] = 'toggle'
      if (seriesUnchecked.length !== 0) {
        actionType = 'exclusive'
      } else if (seriesChecked.length === 1 && seriesChecked[0] === name) {
        actionType = 'selectAll'
      }

      const settedState = changeState(index, actionType as LegendAction['type'])
      chart.dispatchAction({
        type: 'legendToggleSelect',
        // repurposing this field for the extra info we need
        name: {
          index: index,
          type: actionType,
          state: settedState,
          chartId: chart.getId(),
        },
      })
    },
    [seriesState, chartRef, changeState]
  )

  return (
    <Flex data-sl-chart-legend {...otherProps} onClick={undefined}>
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
    </Flex>
  )
})

export function getChanges(chart: ChartConfig | null): string {
  let change = ''
  if (chart) {
    if (chart.variant === 'stacked' && chart.type === 'bar') {
      change = 'roundBar'
    }
  }

  return change
}

export function handleChanges(
  change: string,
  option: EChartsOption,
  action: LegendAction
): EChartsOption {
  let finalOptions = option

  if (change === 'roundBar' && action.type === 'toggle') {
    finalOptions = changeBarRoundingToogle(option, action.state)
  } else if (change === 'roundBar' && action.type === 'exclusive') {
    finalOptions = changeBarRoundingExclusive(option, action.index)
  }

  return finalOptions
}

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
