import {
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  type ComponentPropsWithRef,
  useCallback,
  useState,
} from 'react'
import type {
  EChartsOption,
  GraphicComponentOption,
  SeriesOption,
} from 'echarts'
import ReactECharts, { type EChartsInstance } from 'echarts-for-react'
import * as echarts from 'echarts'
import { defaultTheme } from '../../theme/themes'
import type { ChartConfig, DefaultHooks } from '../../types/chart'
import {
  checkValidVariant,
  getChartOptions,
  getDefaultByType,
  toggleSerieLegend,
  turnOffSerieLegend,
  turnOnAllLegend,
  turnOnSerieLegend,
} from '../../utils/chart'
import { canUseDOM, useMergeRef } from '@vtex/shoreline-utils'
import {
  DATAZOOM_DEFAULT_STYLE,
  DEFAULT_LOADING_SPINNER,
} from '../../theme/chartStyles'
import { cloneDeep, isArray, type Dictionary } from 'lodash'
import {
  normalizeBarData,
  normalizeHorizontalBarData,
  setAreaColors,
  setAreaGradients,
} from '../../utils/hooks'

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
      zoom = true,
      checkboxLegendBehaviour = true,
      checkboxLegendVisuals = true,
      group,
      ...otherProps
    } = props

    const chartRef = useRef<ReactECharts>(null)
    const [graphics, setGraphics] = useState([] as GraphicComponentOption[])

    const hooks: ((series: EChartsOption) => EChartsOption)[] = useMemo(() => {
      if (optionHooks === null || chartConfig === null) {
        return []
      }
      const { type, variant } = chartConfig
      const checkedVariant =
        variant && checkValidVariant(type, variant)
          ? variant
          : getDefaultByType(type)

      const hooks = [...optionHooks]
      hooks.push(...defaultHooks[type][checkedVariant])
      return hooks
    }, [chartConfig, optionHooks])

    const finalOptions: EChartsOption = useMemo(() => {
      const wholeOption = cloneDeep(option) ?? {}
      wholeOption.series = series
      wholeOption.xAxis = xAxis
      wholeOption.yAxis = yAxis
      wholeOption.title = title
      if (chartConfig === null) {
        return wholeOption
      }

      const hookedOptions = hooks.reduce((opt, fn) => fn(opt), wholeOption)

      const options = getChartOptions(hookedOptions, chartConfig) || wholeOption
      if (zoom && chartConfig.type === 'line') {
        options.grid ??= {}
        options.grid = { ...options.grid, height: '75%' }
        options.dataZoom = DATAZOOM_DEFAULT_STYLE
      }
      if (checkboxLegendVisuals) {
        if (isArray(options.legend)) return options
        options.legend ??= {}
        options.legend.itemStyle = {
          ...options.legend.itemStyle,
          color: 'transparent',
        }
        options.graphic = [
          ...graphics,
          ...(isArray(option?.graphic) ? option.graphic : []),
        ]
      }
      return options
    }, [option, chartConfig, zoom, graphics, series, xAxis, yAxis, title])

    const checkBoxLegend = useCallback(
      (params: { name: any; selected: any }) => {
        if (!chartRef.current) return
        const chart = chartRef.current.getEchartsInstance()

        const seriesNames = Object.keys(params.selected)
        if (
          typeof params.name === 'string' &&
          seriesNames.includes(params.name)
        ) {
          const indexOfClicked = seriesNames.indexOf(params.name)

          params.selected[params.name] = !params.selected[params.name]

          const selectedSeries: string[] = []
          const unselectedSeries: string[] = []

          seriesNames.forEach((serie) => {
            if (params.selected[serie]) selectedSeries.push(serie)
            else unselectedSeries.push(serie)
          })

          let actionType: string

          if (unselectedSeries.length === 0) actionType = 'exclusive'
          else if (
            selectedSeries.length === 1 &&
            params.name === selectedSeries[0]
          )
            actionType = 'selectAll'
          else actionType = 'toggle'

          chart.dispatchAction({
            type: 'legendToggleSelect',
            name: {
              index: indexOfClicked,
              name: params.name as string,
              type: actionType,
            },
          })
          return
        }

        if (typeof params.name === 'string') return

        const legendAction = params.name as {
          index: number
          name: string
          type: 'selectAll' | 'toggle' | 'exclusive'
        }

        if (legendAction.type === 'selectAll') {
          turnOnAllLegend(chart, seriesNames)
          return
        }

        if (
          legendAction.type === 'toggle' &&
          legendAction.index < seriesNames.length
        ) {
          if (seriesNames.includes(legendAction.name)) return
          toggleSerieLegend(chart, seriesNames[legendAction.index])
          return
        }

        if (legendAction.type === 'exclusive') {
          seriesNames.forEach((serie, index) => {
            if (index === legendAction.index) turnOnSerieLegend(chart, serie)
            else turnOffSerieLegend(chart, serie)
          })
          return
        }
      },
      []
    )

    const connectGroups = useCallback(() => {
      if (!group || !chartRef.current) return
      const chart = chartRef.current.getEchartsInstance()
      if (chart.group === group) return
      chart.group = group

      echarts.connect(group)
    }, [group])

    const handleResize = useCallback(() => {
      if (chartRef.current) {
        chartRef.current.getEchartsInstance().resize()
      }
    }, [chartRef])

    useEffect(() => {
      if (!canUseDOM) return

      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }, [handleResize, canUseDOM])

    return (
      <div data-sl-chart>
        <ReactECharts
          ref={useMergeRef(ref, chartRef)}
          theme={theme}
          option={finalOptions}
          style={{ minWidth: 300, minHeight: 200, padding: 20, ...style }}
          opts={{ renderer: renderer }}
          showLoading={loading}
          loadingOption={loadingConfig}
          // onChartReady={(instance) => instance.resize()}
          onEvents={{
            legendselectchanged: checkBoxLegend,
            finished: connectGroups,
            rendered: setupCheckBoxVisual,
            ...onEvents,
          }}
          {...otherProps}
        />
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
   * Configs containing **type** of chart and its **variants**, each variant is a pre-defined chart style for each type.
   *
   * **null** means that nothing will be done to the options, and the chart will be rendered as-is.
   * @example { type:"line", variant: "default" }
   */
  chartConfig: ChartConfig | null
  /**
   * Echarts options for the chart, see [docs](https://echarts.apache.org/en/option.html#title).
   *
   * Series and axis options should be set with the other props,
   * this one is meant to be used for other things, like enabling toolbox features.
   */
  option?: EChartsOption
  /**
   * **Pure** functions that will be run on the option object before the default styles are applied, in addition to any default hooks that may be applied per chart type.
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
   * Whether to use our custom checkbox legend behaviour.
   */
  checkboxLegendBehaviour?: boolean
  /**
   * Whether to use our custom checkbox legend visuals, including the checkbox itself
   * and custom hover and off states.
   */
  checkboxLegendVisuals?: boolean
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
  },
  line: {
    default: [],
  },
  area: {
    overlapping: [setAreaGradients],
    stacked: [setAreaColors],
  },
}
