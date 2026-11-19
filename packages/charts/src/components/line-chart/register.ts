import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  MarkPointComponent,
  TooltipComponent,
} from 'echarts/components'

import { use } from '../../internal/echarts'

/**
 * Engine modules the line chart needs, registered as a side effect of
 * importing the component so consumer bundles only carry the charts they use.
 * `MarkPointComponent` carries the isolated values a dense series must keep
 * visible after its per-point markers go away.
 */
use([
  LineChart,
  GridComponent,
  LegendComponent,
  TooltipComponent,
  MarkPointComponent,
])
