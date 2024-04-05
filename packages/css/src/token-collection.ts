import type { AnyObject } from '@vtex/shoreline-utils'
import {
  cleanTokenString,
  constants,
  flattenObject,
  isToken,
  pascalCase,
  cssVar,
  toVar,
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
    this.collection = this.init(tokens)
  }

  /**
   * Initialize the TokenCollection
   * @param tokens
   * @returns
   */
  private init(tokens: AnyObject): Map<string, Token> {
    const tokenCollection = new Map<string, Token>()
    /**
     * The first level of the token-tree defines token-type list
     * @see https://shoreline.vtex.com/guides/theming/defining-tokens#the-token-tree
     */
    const typeList = Object.keys(tokens)
    /**
     * We represent the tree in a flat structure to avoid recursive algorithms.
     * This makes the codebase more reachable, and O(n) cost.
     */
    const flatTokens = flattenObject(tokens)

    for (const name in flatTokens) {
      const value = flatTokens[name]
      const valueList: string[] = value.trim().split(constants.whiteSpace)

      tokenCollection.set(
        name,
        new Token({
          name,
          value,
          resolvedValue: valueList
            .map(cleanTokenString)
            .map((val) => flatTokens[val] ?? val)
            .join(constants.whiteSpace),
          isAlias: valueList.length === 1 && isToken(valueList[0]),
          isComposite: valueList.length > 1 && valueList.some(isToken),
          type: typeList.find((t) => name.startsWith(t)) ?? name.split('-')[0],
        })
      )
    }

    return tokenCollection
  }

  /**
   * All tokens in the collection
   */
  public get tokens(): Map<string, Token> {
    return this.collection
  }

  /**
   * Find a token by name
   */
  public findToken(name: string) {
    return this.collection.get(name)
  }

  public getObject(): Record<string, string> {
    const result: Record<string, string> = {}

    for (const key of this.collection.keys()) {
      const token = this.findToken(key)

      if (token) {
        result[pascalCase(token.name)] = token.cssReference
      }
    }

    return result
  }

  /**
   * Returns the resolved token object,
   * Which means that all references are turned into actual values.
   */
  public getResolvedObject(): Record<string, string> {
    const result: Record<string, string> = {}

    for (const key of this.collection.keys()) {
      const token = this.findToken(key)

      if (token) {
        result[pascalCase(token.name)] = token.resolvedValue
      }
    }

    return result
  }

  /**
   *
   * @param literal The name of the constant
   * @returns
   */
  public getTsString(literal = 'ShorelineTokens') {
    return `export const ${literal} = ${JSON.stringify(this.getObject())};`
  }

  public async getTsCode(literal = 'ShorelineTokens'): Promise<string> {
    const code = await format(this.getTsString(literal), {
      parser: 'typescript',
      semi: false,
      singleQuote: true,
    })

    return code
  }

  public getCssString(layer = 'sl-tokens') {
    let cssString = ''

    for (const key of this.collection.keys()) {
      const token = this.findToken(key)

      if (token) {
        cssString += `${cssesc(token.cssProperty)}: ${cssesc(
          token.cssValue
        )};\n`
      }
    }

    return layer
      ? `@layer ${layer} { :root { ${cssString} }}`
      : `:root { ${cssString} }`
  }

  public getResolvedCssString() {
    let draftCssString = ''

    for (const key of this.collection.keys()) {
      const token = this.findToken(key)

      if (token) {
        draftCssString += `${cssesc(token.cssProperty)}: ${cssesc(
          token.resolvedValue
        )};\n`
      }
    }

    return `@layer sl-tokens { :root { ${draftCssString} }}`
  }

  public async getCssCode(
    layer = 'sl-tokens',
    preflight = true
  ): Promise<string> {
    const cssString = this.getCssString(layer)

    const preflightCode = preflight
      ? fse.readFileSync(path.resolve(__dirname, 'preflight.css')).toString()
      : ''

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

interface TokenConstructorParams {
  name: string
  value: string
  resolvedValue: string
  isAlias: boolean
  isComposite: boolean
  type: string
}

export class Token {
  private _name: string
  private _cssProperty: string
  private _cssValue: string
  private _cssReference: string
  private _value: string
  private _resolvedValue: string
  private _isAlias: boolean
  private _isComposite: boolean
  private _type: string

  constructor(params: TokenConstructorParams) {
    const { name, value, resolvedValue, isAlias, isComposite, type } = params

    this._name = name
    this._cssProperty = toVar(name)
    this._cssValue = cssVar({
      token: value,
      prefix: constants.dsPrefix,
      deepSearch: true,
    })
    this._cssReference = `var(${this._cssProperty})`
    this._value = value
    this._resolvedValue = resolvedValue
    this._isAlias = isAlias
    this._isComposite = isComposite
    this._type = type
  }

  /**
   * Token name
   * @see https://shoreline.vtex.com/guides/styling/design-tokens#token-name
   */
  public get name(): string {
    return this._name
  }

  /**
   * Css property for the token-name
   * @example --property-name
   */
  public get cssProperty(): string {
    return this._cssProperty
  }

  /**
   * Css value of the token. Can be either a CSS value or variable.
   * @example #fff or var(--reference-name)
   */
  public get cssValue(): string {
    return this._cssValue
  }

  /**
   * Reference for the css-property
   * @example var(--property-name)
   */
  public get cssReference(): string {
    return this._cssReference
  }

  /**
   * Value that is present on the token declaration
   * @example $property-name
   */
  public get value(): string {
    return this._value
  }

  /**
   * Resolved _value
   * @example #fff
   */
  public get resolvedValue(): string {
    return this._resolvedValue
  }

  /**
   * Whether is alias or not
   * @see https://shoreline.vtex.com/guides/styling/design-tokens#token-alias
   */
  public get isAlias(): boolean {
    return this._isAlias
  }

  /**
   * Whether is composite or not
   * @see https://shoreline.vtex.com/guides/styling/design-tokens#composite-tokens
   */
  public get isComposite(): boolean {
    return this._isComposite
  }

  /**
   * Token type
   * @see https://shoreline.vtex.com/guides/styling/design-tokens#token-type
   */
  public get type(): string {
    return this._type
  }
}
