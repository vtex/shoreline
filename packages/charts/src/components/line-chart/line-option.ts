import type { ChartCurve } from '../../internal/curve'
import { isSmoothCurve } from '../../internal/curve'
import type { EChartsCoreOption } from '../../internal/echarts'
import type { ChartAxisPointer } from '../../internal/option'
import {
  buildAxisTooltip,
  buildCategoryAxis,
  buildGrid,
  buildLegend,
  buildValueAxis,
  hasNegativeValues,
} from '../../internal/option'
import {
  collapseSeries,
  createDeltaLookup,
  othersColorToken,
} from '../../internal/series'
import { createNumberFormatter } from '../../internal/format'
import { legendIcon } from '../../internal/legend'
import type { IsolatedPoint } from '../../internal/symbols'
import {
  isolatedPoints,
  lineSymbolSize,
  pointMarkersFit,
} from '../../internal/symbols'