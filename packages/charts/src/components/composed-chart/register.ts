import { BarChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components'

import { use } from '../../internal/echarts'

/**
 * Engine modules the composed chart needs, registered as a side effect of
 * importing the component so consumer bundles only carry the charts they use.
 */
use([BarChart, LineChart, GridComponent, LegendComponent, TooltipComponent])
