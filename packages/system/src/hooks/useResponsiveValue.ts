import type { ResponsiveValue } from '@vtex/admin-styles'

import { useResponsiveValue as useValue } from '../match-media'

export function useResponsiveValue<T>(value: ResponsiveValue<T>): T {
  const baseValue = Array.isArray(value) ? value : [value]
  const responsiveValue = useValue<T>(baseValue)

  return responsiveValue
}
