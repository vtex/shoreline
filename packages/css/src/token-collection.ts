import type { AnyObject, StringCaseOptions } from '@vtex/shoreline-utils'
import {
  constants,
  cssVar,
  flattenObject,
  toVar,
  cleanTokenString,
  isToken,
  stringCase,
} from '@vtex/shoreline-utils'
import cssesc from 'cssesc'
import fse from 'fs-extra'
import path from 'path'
import postcss from 'postcss'
import { format } from 'prettier'
import presetEnv from 'postcss-preset-env'

export class TokenCollecton {
  private collection: Map<string, Token>

  constructor(tokens: AnyObject) {
    this.collection = buildTokenTree(tokens)
  }

  public get tokens(): Map<string, Token> {
    return this.collection
  }

  public addToken(token: Token): void {
    this.collection.set(token.id, token)
  }

  public deleteToken(token: Token): void {
    this.collection.delete(token.id)
  }

  public findToken(id: string) {
    return this.collection.get(id)
  }

  public getObject(
    keyCase: StringCaseOptions = 'pascal'
  ): Record<string, string> {
    const result: Record<string, string> = {}

    for (const key of this.collection.keys()) {
      const token = this.findToken(key)

      if (token) {
        result[stringCase(token.id, keyCase)] = token.cssVariable
      }
    }

    return result
  }

  public getObjectRaw(
    keyCase: StringCaseOptions = 'pascal'
  ): Record<string, string> {
    const result: Record<string, string> = {}

    for (const key of this.collection.keys()) {
      const token = this.findToken(key)

      if (token) {
        result[stringCase(token.id, keyCase)] = token.rawValue
      }
    }

    return result
  }

  public getCssString() {
    let draftCssString = ''

    for (const key of this.collection.keys()) {
      const token = this.findToken(key)

      if (token) {
        draftCssString += `${cssesc(token.cssDeclaration)}: ${cssesc(
          token.cssVariable
        )};\n`
      }
    }

    return `@layer sl-tokens { :root { ${draftCssString} }}`
  }

  public getCssStringRaw() {
    let draftCssString = ''

    for (const key of this.collection.keys()) {
      const token = this.findToken(key)

      if (token) {
        draftCssString += `${cssesc(token.cssDeclaration)}: ${cssesc(
          token.rawValue
        )};\n`
      }
    }

    return `@layer sl-tokens { :root { ${draftCssString} }}`
  }

  public async getCssCode(): Promise<string> {
    const cssString = this.getCssString()

    const preflightCode = fse
      .readFileSync(path.resolve(__dirname, 'preflight.css'))
      .toString()

    const { css: unformatedCss } = await postcss([
      presetEnv({
        stage: 4,
        features: {
          'custom-media-queries': true,
          'system-ui-font-family': true,
          'nesting-rules': true,
        },
      }),
    ]).process(preflightCode + cssString)

    const cssCode = await format(unformatedCss, {
      parser: 'css',
      semi: false,
      singleQuote: true,
    })

    return cssCode
  }
}

class Token {
  private _id: string
  private _cssDeclaration: string
  private _cssVariable: string
  private _value: string
  private _rawValue: string
  private _isAlias: boolean
  private _isCompound: boolean

  constructor(draft: DraftToken) {
    const { id, value, rawValue, isAlias, isCompound } = draft

    this._id = id
    this._value = value
    this._rawValue = rawValue
    this._cssDeclaration = toVar(id)
    this._cssVariable = cssVar({
      token: value,
      prefix: constants.dsPrefix,
      deepSearch: true,
    })
    this._isAlias = isAlias
    this._isCompound = isCompound
  }

  public get id(): string {
    return this._id
  }

  public get cssDeclaration(): string {
    return this._cssDeclaration
  }

  public get cssVariable(): string {
    return this._cssVariable
  }

  public get value(): string {
    return this._value
  }

  public get rawValue(): string {
    return this._rawValue
  }

  public get isAlias(): boolean {
    return this._isAlias
  }

  public get isCompound(): boolean {
    return this._isCompound
  }
}

function buildTokenTree(tokens: AnyObject): Map<string, Token> {
  const tokenTree = new Map<string, Token>()
  const flatTokens = flattenObject(tokens)

  for (const id in flatTokens) {
    const value = flatTokens[id]

    const valueList: string[] = value.trim().split(constants.whiteSpace)
    const isAlias = valueList.length === 1 && isToken(valueList[0])
    const isCompound = valueList.length > 1 && valueList.some(isToken)

    const rawValue = valueList
      .map(cleanTokenString)
      .map((val) => flatTokens[val] ?? val)
      .join(constants.whiteSpace)

    tokenTree.set(
      id,
      new Token({
        id,
        value,
        rawValue,
        isAlias,
        isCompound,
      })
    )
  }

  return tokenTree
}

interface DraftToken {
  id: string
  value: string
  rawValue: string
  isAlias: boolean
  isCompound: boolean
}
