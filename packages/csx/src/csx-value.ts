import { cssVar } from './css-var'
import type { CsxObject } from './types'
import { isToken as isTokenPureFunction, isString } from './token-utils'

type EntryType = string | number | CsxObject

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
