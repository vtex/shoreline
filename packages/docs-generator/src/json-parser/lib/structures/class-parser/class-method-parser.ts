import { Parser } from '../parser'
import { ClassParser } from '.'
import { SignatureParser, SourceParser } from '../misc'
import { ReflectionKind, reflectionKindToString } from '../../types'
import type { JSONOutput } from 'typedoc'

/**
 * Parses data from a class method reflection.
 */
export class ClassMethodParser extends Parser {
  /**
   * The id of the parent class parser.
   */
  public readonly parentId: number

  /**
   * The accessibility of this method.
   */
  public readonly accessibility: ClassParser.Accessibility

  /**
   * Whether this method is abstract.
   */
  public readonly abstract: boolean

  /**
   * Whether this method is static.
   */
  public readonly static: boolean

  /**
   * The signature parsers of this method.
   */
  public readonly signatures: SignatureParser[]

  public constructor(data: ClassMethodParser.Data) {
    super(data)

    const {
      parentId,
      accessibility,
      abstract,
      static: _static,
      signatures,
    } = data

    this.parentId = parentId
    this.accessibility = accessibility
    this.abstract = abstract
    this.static = _static
    this.signatures = signatures
  }

  /**
   * Whether or not this method has a public accessibility.
   * @returns The validation boolean.
   */
  public isPublic(): boolean {
    return this.accessibility === ClassParser.Accessibility.Public
  }

  /**
   * Whether or not this method has a protected accessibility.
   * @returns The validation boolean.
   */
  public isProtected(): boolean {
    return this.accessibility === ClassParser.Accessibility.Protected
  }

  /**
   * Whether or not this method has a private accessibility.
   * @returns The validation boolean.
   */
  public isPrivate(): boolean {
    return this.accessibility === ClassParser.Accessibility.Private
  }

  /**
   * Convert this parser to a JSON compatible format.
   * @returns The json compatible format of this parser.
   */
  public override toJSON(): ClassMethodParser.Json {
    return {
      ...super.toJSON(),
      parentId: this.parentId,
      accessibility: this.accessibility,
      abstract: this.abstract,
      static: this.static,
      signatures: this.signatures.map((signature) => signature.toJSON()),
    }
  }

  /**
   * Generates a new {@link ClassMethodParser} instance from the given data.
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection,
    parentId: number
  ): ClassMethodParser {
    const { kind, id, name, sources = [], flags, signatures = [] } = reflection

    if (kind !== ReflectionKind.Method) {
      throw new Error(
        `Expected Method (${
          ReflectionKind.Method
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}). NAME=${name};ID=${id}`
      )
    }

    return new ClassMethodParser({
      id,
      name,
      source: sources.length
        ? SourceParser.generateFromTypeDoc(sources[0])
        : null,
      parentId,
      accessibility: flags.isPrivate
        ? ClassParser.Accessibility.Private
        : flags.isProtected
        ? ClassParser.Accessibility.Protected
        : ClassParser.Accessibility.Public,
      abstract: Boolean(flags.isAbstract),
      static: Boolean(flags.isStatic),
      signatures: signatures.map((signature) =>
        SignatureParser.generateFromTypeDoc(signature)
      ),
    })
  }

  /**
   * Generates a new {@link ClassMethodParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(
    json: ClassMethodParser.Json
  ): ClassMethodParser {
    const {
      id,
      name,
      source,
      parentId,
      accessibility,
      abstract,
      static: _static,
      signatures,
    } = json

    return new ClassMethodParser({
      id,
      name,
      source: source ? SourceParser.generateFromJson(source) : null,
      parentId,
      accessibility,
      abstract,
      static: _static,
      signatures: signatures.map((signature) =>
        SignatureParser.generateFromJson(signature)
      ),
    })
  }
}

export namespace ClassMethodParser {
  export interface Data extends Parser.Data {
    /**
     * The id of the parent class parser.
     * @since 4.0.0
     */
    parentId: number

    /**
     * The accessibility of this method.
     * @since 1.0.0
     */
    accessibility: ClassParser.Accessibility

    /**
     * Whether this method is abstract.
     * @since 1.0.0
     */
    abstract: boolean

    /**
     * Whether this method is static.
     * @since 1.0.0
     */
    static: boolean

    /**
     * The signature parsers of this method.
     * @since 1.0.0
     */
    signatures: SignatureParser[]
  }

  export interface Json extends Parser.Json {
    /**
     * The id of the parent class parser.
     * @since 4.0.0
     */
    parentId: number

    /**
     * The accessibility of this method.
     * @since 1.0.0
     */
    accessibility: ClassParser.Accessibility

    /**
     * Whether this method is abstract.
     * @since 1.0.0
     */
    abstract: boolean

    /**
     * Whether this method is static.
     * @since 1.0.0
     */
    static: boolean

    /**
     * The signature parsers of this method in a json compatible format.
     * @since 1.0.0
     */
    signatures: SignatureParser.Json[]
  }
}
