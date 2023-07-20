import { cssVar } from './css-var'
import type { CsxObject } from './types'
import { isToken as isTokenPureFunction } from './is-token'

type EntryType = string | number | CsxObject

function isString<T extends string = string>(value: unknown): value is T {
  return typeof value === 'string'
}

export class CsxValue {
  private property: string
  private entry: EntryType

  constructor(property: string, entry: EntryType) {
    this.property = property
    this.entry = isString(entry) ? entry.trim() : entry
  }

  public getProperty() {
    return this.property
  }

  public getEntry() {
    return this.entry
  }

  public isObject() {
    return typeof this.entry === 'object'
  }

  /**
   * Returns wether the CsxValue is a token
   */
  public isToken() {
    return isTokenPureFunction(this.entry)
  }

  public asCleanToken() {
    if (!this.isToken()) return this.entry

    return String(this.entry).substring(1)
  }

  public asCssVar(options?: { deepSearch?: boolean }) {
    if (typeof this.entry !== 'string') {
      return this.entry
    }

    return cssVar({
      token: this.entry,
      deepSearch: options?.deepSearch ?? false,
    })
  }
}
