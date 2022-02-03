import type { Emotion } from '@emotion/css/types/create-instance'
import { createContext, useContext } from 'react'
import invariant from 'tiny-invariant'
import type { StyleProp } from '@vtex/admin-ui-core'

export const SystemContext = createContext<
  | ({
      theme: any
      cn: (styleProp: StyleProp) => string
    } & Pick<Emotion, 'cx' | 'keyframes'>)
  | null
>(null)

export function useSystem() {
  const ctx = useContext(SystemContext)

  invariant(
    ctx,
    'Waaaait! Something is wrong, make sure you are using the useSystem() hook under an AdminUI provider.'
  )

  return ctx
}
