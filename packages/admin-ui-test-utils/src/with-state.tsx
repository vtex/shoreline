import React, { useRef } from 'react'

/**
 * HOC to wrap a component with its state hook
 * @example
 * // Cmp has the useCmp state hook
 * const StatefulCpm = withState(Cmp, () => useCmpState({ isSelected: false }))
 */
export function withState(Component: any, useStateHook: () => any) {
  function StatefulComponent(props: any) {
    // Avoids an invalid hook call
    const ref = useRef(useStateHook())

    return <Component state={ref.current} {...props} />
  }

  StatefulComponent.displayName = Component.displayName

  return StatefulComponent
}
