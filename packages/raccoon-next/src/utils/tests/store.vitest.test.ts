import { test, expect } from '@vtex/shoreline-test-utils'
import { createStore } from '../store'

test('createStore returns a store object with the expected shape', () => {
  const store = createStore()

  expect(store !== undefined)
  expect(typeof store === 'object')
  expect(typeof store.subscribe === 'function')
  expect(typeof store.set === 'function')
  expect(typeof store.read === 'function')
})

test('store.read returns the current value of the store', () => {
  const store = createStore<{
    status: string
    payload: number
  }>()

  store.set({ status: 'fulfilled', payload: 42 })

  expect(store.read().status === 'fulfilled')
  expect(store.read().payload === 42)
})
