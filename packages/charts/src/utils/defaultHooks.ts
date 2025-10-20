import type { DefaultHooks } from '../types/chart'
import {
  normalizeBarData,
  normalizeHorizontalBarData,
  roundCap,
  normalizeStackedBars,
  setAreaGradients,
  setAreaColors,
  sunburstCoreColoring,
} from './hooks'

/**
 * Functions that are always called for a certain chart config
 */
export const chartsDefaultHooks: DefaultHooks = {
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
  sunburst: {
    default: [sunburstCoreColoring],
  },
  donut: {
    default: [],
  },
  scatter: {
    default: [],
    tooltip2: [],
  },
}

/**
 * Functions that are always called for a certain chart config
 */
export const chartCompositorDefaultHooks: DefaultHooks = {
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
  sunburst: {
    default: [sunburstCoreColoring],
  },
  scatter: {
    default: [],
    tooltip2: [],
  },
  donut: {
    default: [],
  },
}
