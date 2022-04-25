import { createContext, useContext } from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'
import invariant from 'tiny-invariant'
import type { Emotion } from '@emotion/css/types/create-instance'

export interface SystemContextType extends Pick<Emotion, 'cx' | 'keyframes'> {
  theme: any
  cn: (styleProp: StyleProp) => string
}

export const SystemContext = createContext<SystemContextType | null>(null)

/**
 * Access the System context
 * @returns
 */
export function useSystem(): SystemContextType {
  const ctx = useContext(SystemContext)

  invariant(
    ctx,
    'Something is wrong, make sure you are using the useSystem() hook under an AdminUI provider.'
  )

  return ctx
}
