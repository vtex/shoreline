import { useCallback, useMemo, useReducer, Dispatch } from 'react'

/**
 * Keeps track of the grid status
 */
export function useStatus(): UseStatusReturn {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    error: null,
    empty: null,
    notFound: null,
  })

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

function reducer(_: StatusObject, action: Action) {
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
          onRetry: action.onRetry,
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
          href: action.href,
          onClick: action.onClick,
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

export interface StatusObject {
  loading: boolean
  notFound: NotFoundState | null
  error: ErrorState | null
  empty: EmptyState | null
}

export type Status = 'ready' | 'loading' | 'not-found' | 'empty' | 'error'

export type SetStatus = Dispatch<Action>

export interface UseStatusReturn {
  status: Status
  statusObject: StatusObject
  setStatus: SetStatus
}

interface NotFoundState {
  message: string
  suggestion?: string
}

interface ErrorState {
  message: string
  onRetry?: () => void
}

interface EmptyState {
  message: string
  href?: string
  onClick?: () => void
}

type AliasedState<T, S> = { type: T } & S

type Action =
  | {
      type: 'ready' | 'loading'
    }
  | AliasedState<'not-found', NotFoundState>
  | AliasedState<'error', ErrorState>
  | AliasedState<'empty', EmptyState>
