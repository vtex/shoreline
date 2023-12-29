export class Store<
  TState,
  TUpdater extends AnyUpdater = (cb: TState) => TState
> {
  private listeners = new Set<Listener>()
  private _state: TState
  private _options?: StoreOptions<TState, TUpdater>
  private _batching = false
  private _flushing = 0

  constructor(initialState: TState, options?: StoreOptions<TState, TUpdater>) {
    this._state = initialState
    this._options = options
  }

  public get state() {
    return this._state
  }

  public subscribe = (listener: Listener) => {
    this.listeners.add(listener)
    const unsub = this._options?.onSubscribe?.(listener, this)

    return () => {
      this.listeners.delete(listener)
      unsub?.()
    }
  }

  public setState = (updater: TUpdater) => {
    const previous = this._state

    this._state = this._options?.updateFn
      ? this._options.updateFn(previous)(updater)
      : (updater as any)(previous)

    // Always run onUpdate, regardless of batching
    this._options?.onUpdate?.()

    // Attempt to flush
    this._flush()
  }

  public _flush = () => {
    if (this._batching) return
    const flushId = ++this._flushing

    this.listeners.forEach((listener) => {
      if (this._flushing !== flushId) return
      listener()
    })
  }

  public batch = (cb: () => void) => {
    if (this._batching) return cb()
    this._batching = true
    cb()
    this._batching = false
    this._flush()
  }
}

export type AnyUpdater = (...args: any[]) => any

type Listener = () => void

interface StoreOptions<
  TState,
  TUpdater extends AnyUpdater = (cb: TState) => TState
> {
  updateFn?: (previous: TState) => (updater: TUpdater) => TState
  onSubscribe?: (
    listener: Listener,
    store: Store<TState, TUpdater>
  ) => () => void
  onUpdate?: () => void
}
