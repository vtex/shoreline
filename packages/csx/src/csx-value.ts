import { cssVar } from './css-var'
import type { CsxObject } from './types'
import { isToken as isTokenPureFunction, isString } from './token-utils'

type EntryType = string | number | CsxObject

export class CsxValue {
  private _property: string
  private _entry: EntryType

  constructor(property: string, entry: EntryType) {
    this._property = property
    this._entry = isString(entry) ? entry.trim() : entry
  }

  public get property(): string {
    return this._property
  }

  public get entry(): EntryType {
    return this._entry
  }

  public isObject(): boolean {
    return typeof this.entry === 'object'
  }

  /**
   * Returns wether the CsxValue is a token
   */
  public isToken(): boolean {
    return isTokenPureFunction(this.entry)
  }

  public asCleanToken(): EntryType {
    if (!this.isToken()) return this.entry

    return String(this.entry).substring(1)
  }

  public asCssVar(options?: { deepSearch?: boolean }): EntryType {
    if (typeof this.entry !== 'string') {
      return this.entry
    }

    return cssVar({
      token: this.entry,
      deepSearch: options?.deepSearch ?? false,
    })
  }
}
