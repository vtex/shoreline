import { useSyncExternalStore } from 'react'

type Subscriber<T> = (value: T) => void

type Fulfilled<T> = {
  status: 'fulfilled'
  payload: T
}

type Rejected = {
  status: 'rejected'
  payload: unknown
}

type Pending = {
  status: 'pending'
  payload: Promise<void>
}

type Value<T> = Fulfilled<T> | Rejected | Pending

export type Store<T> = ReturnType<typeof createStore<T>>

export const createStore = <T>() => {
  const subscribers: Array<Subscriber<T>> = []

  let resolve: undefined | (() => void)

  let value: Value<T> = {
    status: 'pending',
    payload: new Promise<void>((res) => (resolve = res)),
  }

  const set = (val: T) => {
    if (value.status === 'pending') {
      resolve?.()
    }

    value = {
      status: 'fulfilled',
      payload: val,
    }

    for (const sub of subscribers) {
      sub(val)
    }
  }

  const reject = (val: unknown) => {
    if (value.status === 'pending') {
      resolve?.()
    }

    value = {
      status: 'rejected',
      payload: val,
    }
  }

  const read = (): T => {
    if (value.status === 'fulfilled') {
      return value.payload
    }

    if (value.status === 'pending') {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw value.payload
    }

    throw value.payload
  }

  const subscribe = (sub: Subscriber<T>) => {
    const index = subscribers.length

    subscribers.push(sub)

    return () => {
      subscribers.splice(index, 1)
    }
  }

  return {
    set,
    read,
    reject,
    subscribe,
  }
}

export function useStore<T>(store: Store<T>) {
  return useSyncExternalStore(store.subscribe, store.read)
}
