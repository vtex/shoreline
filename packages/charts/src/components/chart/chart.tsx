import {
  useRef,
  useMemo,
  forwardRef,
  useCallback,
  useEffect,
  type ComponentPropsWithRef,
} from 'react'
import type { EChartsOption, SeriesOption } from 'echarts'
import ReactECharts, { type EChartsInstance } from 'echarts-for-react'
import * as echarts from 'echarts'
import { defaultTheme } from '../../theme/themes'
import type { ChartConfig, DefaultHooks } from '../../types/chart'
import {
  checkValidVariant,
  checkZoom,
  getChartOptions,
  getDefaultByType,
} from '../../utils/chart'
import { canUseDOM, useMergeRef } from '@vtex/shoreline-utils'
import {
  DATAZOOM_DEFAULT_STYLE,
  DEFAULT_LOADING_SPINNER,
} from '../../theme/chartStyles'
import { cloneDeep, type Dictionary } from 'lodash'
import {
  normalizeBarData,
  normalizeHorizontalBarData,
  normalizeStackedBars,
  roundCap,
  setAreaColors,
  setAreaGradients,
} from '../../utils/hooks'
import {
  toggleSerieLegend,
  turnOffSerieLegend,
  turnOnAllLegend,
  turnOnSerieLegend,
} from '../../utils/legend'
import { Legend, type LegendHandle, type LegendAction } from '../legend'

import '../../theme/components/chart.css'

/**
 * Render a Shoreline Chart with Echarts. Mixes user options with defaults determined by chart type.
 * @see https://echarts.apache.org/en/index.html
 * @example
 * <Chart
      chartConfig={{ type: 'bar', variant: 'default' }}
      option={{
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        series: [{ data: [1, 2, 3, 4, 5, 6, 7] }],
      }}
      style={{ height: 550 }}
    />
 */
export const Chart = forwardRef<ReactECharts | undefined, ChartProps>(
  function Charts(props, ref) {
    const {
      series,
      xAxis = {},
      yAxis = {},
      title,
      option,
      loading = false,
      loadingConfig = DEFAULT_LOADING_SPINNER,
      chartConfig,
      style,
      renderer = 'svg',
      theme = defaultTheme,
      optionHooks = [],
      onEvents,
      zoom,
      checkboxLegend = true,
      group,
      ...otherProps
    } = props

    const chartRef = useRef<ReactECharts>(null)
    const legendRef = useRef<LegendHandle>(null)

    const hooks: ((series: EChartsOption) => EChartsOption)[] = useMemo(() => {
      if (optionHooks === null || chartConfig === null) {
        return []
      }
      const { type, variant } = chartConfig
      const checkedVariant =
        variant && checkValidVariant(type, variant)
          ? variant
          : getDefaultByType(type)

      const hooks = [...defaultHooks[type][checkedVariant]]
      hooks.push(...optionHooks)
      return hooks
    }, [chartConfig, optionHooks])

    const finalOptions: EChartsOption = useMemo(() => {
      const wholeOption = cloneDeep(option) ?? {}
      wholeOption.series = cloneDeep(series)
      wholeOption.xAxis = cloneDeep(xAxis)
      wholeOption.yAxis = cloneDeep(yAxis)
      wholeOption.title = cloneDeep(title)

      if (checkZoom(zoom, chartConfig?.type)) {
        wholeOption.grid ??= {}
        wholeOption.grid = { ...wholeOption.grid, height: '75%' }
        wholeOption.dataZoom = DATAZOOM_DEFAULT_STYLE
      }

      if (loading) {
        wholeOption.tooltip = {
          show: false,
        }
      }

      if (chartConfig === null) {
        return wholeOption
      }

      const hookedOptions = hooks.reduce((opt, fn) => fn(opt), wholeOption)
      const options = getChartOptions(hookedOptions, chartConfig) || wholeOption

      return options
    }, [
      option,
      loading,
      chartConfig,
      zoom,
      series,
      xAxis,
      yAxis,
      title,
      hooks.reduce,
    ])

    const checkBoxLegend = useCallback(
      (params: any) => {
        if (!chartRef.current) return
        const chart = chartRef.current.getEchartsInstance()
        const series = finalOptions.series as SeriesOption[]
        const action = params.name as LegendAction

        if (action.type === 'toggle' && action.index < series.length) {
          toggleSerieLegend(chart, String(series[action.index].name))
        }

        if (action.type === 'selectAll') {
          turnOnAllLegend(
            chart,
            series.map((serie) => String(serie.name))
          )
        }

        if (action.type === 'exclusive') {
          series.forEach((s, index) => {
            if (index === action.index) turnOnSerieLegend(chart, String(s.name))
            else turnOffSerieLegend(chart, String(s.name))
          })
        }

        if (action.chartId !== chart.getId() && legendRef.current) {
          legendRef.current.setState(action.index, action.type)
        }
      },
      [finalOptions]
    )

    const connectGroups = useCallback(
      (_params?: any) => {
        if (!group || !chartRef.current) return
        const chart = chartRef.current.getEchartsInstance()

        chart.group = group

        echarts.connect(group)
      },
      [group]
    )

    const handleResize = useCallback(() => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize()
      }
    }, [])

    const onRendered = useCallback(
      (_params: any) => {
        connectGroups()
      },
      [connectGroups]
    )

    useEffect(() => {
      if (!canUseDOM) return

      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [handleResize])

    const memoEvents = useMemo(() => {
      return {
        legendselectchanged: checkBoxLegend,
        rendered: onRendered,
      }
    }, [checkBoxLegend, onRendered])

    const eventsAdapter = useMemo(() => {
      const defaultKeys = Object.keys(memoEvents)

      if (!onEvents) return memoEvents

      const newEvents = { ...memoEvents, ...onEvents }

      // for each key in the memoEvents object, if it exists in the onEvents object
      // compose the functions, call both of them
      for (let i = 0; i < defaultKeys.length; i++) {
        if (onEvents[defaultKeys[i]]) {
          newEvents[defaultKeys[i]] = (params: any) => {
            memoEvents[defaultKeys[i]](params)
            onEvents[defaultKeys[i]](params)
          }
        }
      }

      return newEvents
    }, [onEvents, memoEvents])

    return (
      <div
        data-sl-chart={
          chartConfig
            ? `${chartConfig.type}-${chartConfig.variant ? chartConfig.variant : getDefaultByType(chartConfig.type)}`
            : ''
        }
      >
        <ReactECharts
          ref={useMergeRef(ref, chartRef)}
          theme={theme}
          option={finalOptions}
          style={{ minWidth: 300, minHeight: 200, ...style }}
          opts={{ renderer: renderer }}
          showLoading={loading}
          loadingOption={loadingConfig}
          // onChartReady={(instance) => instance.resize()}
          onEvents={eventsAdapter}
          {...otherProps}
        />
        {checkboxLegend ? (
          <Legend
            ref={legendRef}
            series={finalOptions.series}
            chartRef={chartRef}
          />
        ) : null}
      </div>
    )
  }
)
export interface ChartOptions {
  /**
   * Echarts Series Options, where you put the data for the chart.
   * @example series={{ data: [1, 2, 3, 4, 5, 6, 7] }}
   */
  series: SeriesOption | SeriesOption[]
  /**
   * Configs containing **type** of chart and its **variants**, each variant is a pre-defined chart style for each type.
   *
   * **null** means that nothing will be done to the options, and the chart will be rendered as-is.
   * @example { type:"line", variant: "default" }
   */
  chartConfig: ChartConfig | null
  /**
   * Defines the look and data of the X axis. Generally you will need to pass the name of the labels
   * if this is the categorical axis.
   * @example xAxis={{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }}
   */
  xAxis?: EChartsOption['xAxis']
  /**
   * Defines the look and data of the Y axis. Generally you won't need to fill this out, if this is the value axis.
   */
  yAxis?: EChartsOption['yAxis']
  /**
   * Defines the title, as well as its position and style.
   */
  title?: EChartsOption['title']
  /**
   * Echarts options for the chart, see [docs](https://echarts.apache.org/en/option.html#title).
   *
   * Series and axis options should be set with the other props,
   * this one is meant to be used for other things, like enabling toolbox features.
   */
  option?: EChartsOption
  /**
   * Functions that will be run on the option object before the default styles are applied, in addition to any default hooks that may be applied per chart type.
   *
   * These functions should receive an **EchartsOption** and return the same.
   *
   * If set to null no default hooks will be applied.
   */
  optionHooks?: ((series: EChartsOption) => EChartsOption)[] | null
  /**
   * Whether to enable zoom and the zoom bar, which will also make the chart slightly smaller to fit the bar.
   */
  zoom?: boolean
  /**
   * Whether to use the custom Shoreline checkbox legend. Setting to false fallbacks to the default Echarts legend.
   */
  checkboxLegend?: boolean
  /**
   * Defines the group that the chart will be part of. Charts in the same group share many features among them.
   * These features include: sharing the tooltip and sharing the same legend.
   *
   * See [echarts docs](https://echarts.apache.org/en/api.html#echarts.connect).
   */
  group?: string
  /**
   * Whether to render the chart as a SVG or Canvas. Both are about equally as fast,
   * but SVGs can scale to any size.
   *
   * Canvas is required if the chart is meant to be downloaded as a png or jpg, as SVG-rendered charts can only be exported as SVG.
   * @default svg
   */
  renderer?: 'svg' | 'canvas'
  /**
   * Overrides default shoreline theme.
   * @default defaultTheme
   */
  theme?: Dictionary<any> | string
  /**
   * Wether is loading.
   * @default false
   */
  loading?: boolean
  /**
   * Echarts showLoading options, see [docs]("https://echarts.apache.org/en/api.html#echartsInstance.showLoading).
   * @default false
   */
  loadingConfig?: EChartsInstance['showLoading']
  /**
   * Binds callback functions to certain events, see [docs](https://echarts.apache.org/en/api.html#events)
   * for a complete list of available events and their parameters.
   */
  onEvents?: Record<string, CallableFunction>
}

export type ChartProps = ChartOptions &
  Omit<ComponentPropsWithRef<'div'>, 'title'>

/**
 * Functions that are always called for a certain chart config
 */
const defaultHooks: DefaultHooks = {
  bar: {
    vertical: [normalizeBarData],
    horizontal: [normalizeHorizontalBarData],
    stacked: [roundCap],
    'percentage stack': [normalizeStackedBars],
  },
  line: {
    default: [],
  },
  area: {
    overlapping: [setAreaGradients],
    stacked: [setAreaColors],
  },
  funnel: {
    default: [],
  },
}
