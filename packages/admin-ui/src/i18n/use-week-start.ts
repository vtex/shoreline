import { useRegion } from './use-region'
import { weekData } from './week-data'

/**
 * Returns the day that the week start on the current region
 */
export function useWeekStart() {
  const region = useRegion()

  return weekData[region] || 0
}
