import React from 'react'
import invariant from 'tiny-invariant'

import { ButtonProps } from '../unstableButton'
import { SetProps } from '../unstableSet'

const ActionsContext = React.createContext<
  (Pick<ButtonProps, 'size' | 'palette'> & Pick<SetProps, 'orientation'>) | null
>(null)

export function useActionsContext() {
  const context = React.useContext(ActionsContext)

  invariant(context, 'You must use Actions composites inside Actions context!')

  return context
}

const { Provider } = ActionsContext

export { Provider as ActionsProvider }
