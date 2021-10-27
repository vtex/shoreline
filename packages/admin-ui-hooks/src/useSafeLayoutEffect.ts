import { useLayoutEffect, useEffect } from 'react'
import { isBrowser } from '@vtex/admin-ui-util'

export const useSafeLayoutEffect = isBrowser ? useLayoutEffect : useEffect
