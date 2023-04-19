import type { HTMLAttributeAnchorTarget, Dispatch } from 'react'
import { useCallback, useMemo, useReducer } from 'react'
import invariant from 'tiny-invariant'

const defaultState: DataViewStatusObject = {
  loading: false,
  error: null,
  empty: null,
  notFound: false,
}

/**
 * Keeps the state of the DataView component
 * @example
 * const view = useDataViewState()
 *
 * <DataView state={view} />
 */
export function useDataViewState(
  initialState: DataViewStatusObject = defaultState
): DataViewState {
  const [state, dispatch] = useReducer(reducer, initialState as any)

  const setStatus = useCallback(dispatch, [state, dispatch])

  const status = useMemo(
    () =>
      state.loading
        ? 'loading'
        : state.error
        ? 'error'
        : state.notFound
        ? 'not-found'
        : state.empty
        ? 'empty'
        : 'ready',
    [state]
  )

  return {
    status,
    setStatus,
    statusObject: state,
  }
}

/**
 * State reducer
 */
function reducer(_: DataViewStatusObject, action: StatusReducerAction) {
  switch (action.type) {
    case 'loading': {
      return {
        loading: true,
        error: null,
        empty: null,
        notFound: false,
      }
    }

    case 'ready': {
      return {
        loading: false,
        error: null,
        empty: null,
        notFound: false,
      }
    }

    case 'error': {
      return {
        loading: false,
        error: {
          action: action.action,
        },
        empty: null,
        notFound: false,
      }
    }

    case 'empty': {
      return {
        loading: false,
        error: null,
        empty: {
          action: action.action,
        },
        notFound: false,
      }
    }

    case 'not-found': {
      return {
        loading: false,
        error: null,
        empty: null,
        notFound: true,
      }
    }

    default: {
      invariant(
        false,
        'Pass one of the valid types: ready | loading | empty | error | not-found'
      )
    }
  }
}

export interface DataViewStatusObject {
  loading: boolean
  notFound: boolean
  error: ErrorState | null
  empty: EmptyState | null
}

export type DataViewStatus =
  | 'ready'
  | 'loading'
  | 'not-found'
  | 'empty'
  | 'error'

export type DataViewStatusDispatch = Dispatch<StatusReducerAction>

export interface DataViewState {
  status: DataViewStatus
  statusObject: DataViewStatusObject
  setStatus: DataViewStatusDispatch
}

export type StatusAction =
  | {
      text: string
      onClick: () => void
      href?: string
    }
  | {
      text: string
      href: string
      type?: string
      rel?: string
      target?: HTMLAttributeAnchorTarget
      onClick?: () => void
    }

interface ErrorState {
  action?: StatusAction
}

interface EmptyState {
  action?: StatusAction
}

type AliasedState<T, S> = { type: T } & S

type StatusReducerAction =
  | {
      type: 'ready' | 'loading' | 'not-found'
    }
  | AliasedState<'error', ErrorState>
  | AliasedState<'empty', EmptyState>
