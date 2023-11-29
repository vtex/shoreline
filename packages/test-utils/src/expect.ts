import type { AsymmetricMatchersContaining, Assertion } from 'vitest'
import { expect as globalExpect } from 'vitest'
import * as matchers from '@testing-library/jest-dom/matchers'

export interface ShorelineExpect
  extends Omit<Chai.ExpectStatic, 'not'>,
    AsymmetricMatchersContaining {
  <T>(actual: T, message?: string): Omit<Assertion<T>, 'not'> &
    matchers.TestingLibraryMatchers<void, T> & {
      not: Assertion<T> & matchers.TestingLibraryMatchers<void, T>
    }
  unreachable(message?: string): never
  soft<T>(actual: T, message?: string): Assertion<T>
  assertions(expected: number): void
  hasAssertions(): void
  anything(): any
  any(constructor: unknown): any
  getState(): any
  setState(state: Partial<any>): void
  not: <T>(
    actual: T,
    message?: string
  ) => Assertion<T> & matchers.TestingLibraryMatchers<void, T>
}

globalExpect.extend(matchers)

export const expect: ShorelineExpect =
  globalExpect as unknown as ShorelineExpect
