import type { Dispatch } from 'react'
import { useCallback, useMemo, useReducer } from 'react'

const defaultState: DataViewStatusObject = {
  loading: false,
  error: null,
  empty: null,
  notFound: null,
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
function reducer(_: DataViewStatusObject, action: Action) {
  switch (action.type) {
    case 'loading': {
      return {
        loading: true,
        error: null,
        empty: null,
        notFound: null,
      }
    }

    case 'ready': {
      return {
        loading: false,
        error: null,
        empty: null,
        notFound: null,
      }
    }

    case 'error': {
      return {
        loading: false,
        error: {
          message: action.message,
          action: action.action,
        },
        empty: null,
        notFound: null,
      }
    }

    case 'empty': {
      return {
        loading: false,
        error: null,
        empty: {
          message: action.message,
          action: action.action,
        },
        notFound: null,
      }
    }

    case 'not-found': {
      return {
        loading: false,
        error: null,
        empty: null,
        notFound: {
          message: action.message,
          suggestion: action.suggestion,
        },
      }
    }

    default: {
      throw new Error(
        'Pass one of the valid types: ready | loading | empty | error | not-found'
      )
    }
  }
}

export interface DataViewStatusObject {
  loading: boolean
  notFound: NotFoundState | null
  error: ErrorState | null
  empty: EmptyState | null
}

export type DataViewStatus =
  | 'ready'
  | 'loading'
  | 'not-found'
  | 'empty'
  | 'error'

export type DataViewStatusDispatch = Dispatch<Action>

export interface DataViewState {
  status: DataViewStatus
  statusObject: DataViewStatusObject
  setStatus: DataViewStatusDispatch
}

interface NotFoundState {
  message: string
  suggestion?: string
}

interface ErrorState {
  message: string
  action?:
    | {
        text: string
        onClick: () => void
        href?: string
      }
    | {
        text: string
        href: string
        onClick?: () => void
      }
}

interface EmptyState {
  message: string
  action?:
    | {
        text: string
        onClick: () => void
        href?: string
      }
    | {
        text: string
        href: string
        onClick?: () => void
      }
}

type AliasedState<T, S> = { type: T } & S

type Action =
  | {
      type: 'ready' | 'loading'
    }
  | AliasedState<'not-found', NotFoundState>
  | AliasedState<'error', ErrorState>
  | AliasedState<'empty', EmptyState>
