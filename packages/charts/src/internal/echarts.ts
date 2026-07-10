import { AriaComponent } from 'echarts/components'
import { init, use } from 'echarts/core'
import { SVGRenderer } from 'echarts/renderers'

/**
 * Engine modules required by every chart. Chart types (bar, line, …) and the
 * components they need (grid, tooltip, legend, …) are registered by each
 * chart's own module, keeping consumer bundles tree-shaken to the charts they
 * actually import.
 *
 * SVG is the only registered renderer: Admin-scale datasets don't need canvas
 * performance, and SVG output produces crisp, stable Chromatic diffs where
 * canvas screenshots diff noisily.
 */
use([SVGRenderer, AriaComponent])

export { init, use }
export type { EChartsCoreOption, EChartsType } from 'echarts/core'
