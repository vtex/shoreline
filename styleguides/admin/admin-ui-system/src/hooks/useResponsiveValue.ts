import { useResponsiveValue as useValue } from '../match-media'
import { ResponsiveValue } from '../types'

export function useResponsiveValue<T>(value: ResponsiveValue<T>): T {
  const baseValue = Array.isArray(value) ? value : [value]
  const responsiveValue = useValue<T>(baseValue)

  return responsiveValue
}
