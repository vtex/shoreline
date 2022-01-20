import React from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'
import invariant from 'tiny-invariant'
import type { Emotion } from '@emotion/css/create-instance'

export const SystemContext = React.createContext<
  | ({
      theme: any
      cn: (styleProp: StyleProp) => string
    } & Pick<Emotion, 'cx' | 'keyframes'>)
  | null
>(null)

export function useSystem() {
  const ctx = React.useContext(SystemContext)

  invariant(
    ctx,
    'Waaaait! Something is wrong, make sure you are using the useSystem() hook under an AdminUI provider.'
  )

  return ctx
}
