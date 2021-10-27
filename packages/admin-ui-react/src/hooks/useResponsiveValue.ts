import { useState, useEffect } from 'react'
import type { Theme } from '@vtex/admin-ui-core'
import { useSystem } from '../createSystem'

type DefaultOptions = {
  defaultIndex?: number
}

export type ResponsiveValue<T> = T | T[]

const useBreakpointIndex = (options: DefaultOptions = {}) => {
  const { theme } = useSystem()
  const { defaultIndex = 0 } = options
  const breakpoints = (theme && theme.breakpoints) || [
    '40em',
    '48em',
    '64em',
    '75em',
  ]

  if (typeof defaultIndex !== 'number') {
    throw new TypeError(
      `Default breakpoint index should be a number. Got: ${defaultIndex}, ${typeof defaultIndex}`
    )
  } else if (defaultIndex < 0 || defaultIndex > breakpoints.length - 1) {
    throw new RangeError(
      `Default breakpoint index out of range. Theme has ${breakpoints.length} breakpoints, got index ${defaultIndex}`
    )
  }

  const [value, setValue] = useState(defaultIndex)

  useEffect(() => {
    const getIndex = () =>
      breakpoints.filter(
        (bp: string) =>
          window.matchMedia(`screen and (min-width: ${bp})`).matches
      ).length

    const onResize = () => {
      const newValue = getIndex()

      if (value !== newValue) {
        setValue(newValue)
      }
    }

    onResize()
    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [breakpoints, value])

  return value
}

type Values<T> = ((theme: Theme | null) => T[]) | T[]

function useValue<T>(values: Values<T>, options: DefaultOptions = {}): T {
  const { theme } = useSystem()
  const array = typeof values === 'function' ? values(theme) : values
  const index = useBreakpointIndex(options)

  return array[index >= array.length ? array.length - 1 : index]
}

export function useResponsiveValue<T>(value: ResponsiveValue<T>): T {
  const baseValue = Array.isArray(value) ? value : [value]
  const responsiveValue = useValue<T>(baseValue)

  return responsiveValue
}
