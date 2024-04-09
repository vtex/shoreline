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
import postcss from 'postcss'
import { format } from 'prettier'
import presetEnv from 'postcss-preset-env'

export const shorelineLayers =
  '@layer sl-reset, sl-base, sl-tokens, sl-components, sl-extended-components;'

export class TokenCollection {
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

  /**
   * Get a javascript reference object
   * @param resolved All references are resolved as values
   * @returns
   */
  public getObject(resolved = false): Record<string, string> {
    const result: Record<string, string> = {}

    for (const key of this.collection.keys()) {
      const token = this.findToken(key)

      if (token) {
        result[pascalCase(token.name)] = resolved
          ? token.resolvedValue
          : token.cssReference
      }
    }

    return result
  }

  /**
   * Return ts code for the reference object
   * @param literal The name of the constant
   * @param resolved All references are resolved as values
   */
  public async getTs(literal = 'ShorelineTokens', resolved = false) {
    const unformatedTs = `export const ${literal} = ${JSON.stringify(
      this.getObject(resolved)
    )};`

    const formattedTs = await format(unformatedTs, {
      parser: 'typescript',
      semi: false,
      singleQuote: true,
    })

    return formattedTs
  }

  /**
   * Return css code
   * @param useLayers Add layer declaration and scoping
   * @param resolved All references are resolved as values
   */
  public async getCss(useLayers = true, resolved = false) {
    let cssString = ''

    for (const key of this.collection.keys()) {
      const token = this.findToken(key)

      if (token) {
        const tokenValue = resolved ? token.resolvedValue : token.cssValue

        cssString += `${cssesc(token.cssProperty)}: ${cssesc(tokenValue)};\n`
      }
    }

    const cssCode = useLayers
      ? `${shorelineLayers} @layer sl-tokens { :root { ${cssString} }}`
      : `:root { ${cssString} }`

    const { css: unformatedCss } = await postcss([
      presetEnv({
        stage: 4,
        features: {
          'custom-media-queries': true,
          'system-ui-font-family': true,
          'nesting-rules': true,
        },
      }),
    ]).process(cssCode)

    const formattedCss = await format(unformatedCss, {
      parser: 'css',
      semi: false,
      singleQuote: true,
    })

    return formattedCss
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
