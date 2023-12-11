import { Parser } from '../parser'
import { ClassParser } from '.'
import { CommentParser, ParameterParser, SourceParser } from '../misc'
import { ReflectionKind, reflectionKindToString } from '../../types'
import type { JSONOutput } from 'typedoc'

export class ClassConstructorParser extends Parser {
  /**
   * The comment parser of this constructor.
   */
  public readonly comment: CommentParser

  /**
   * The id of the parent class parser.
   */
  public readonly parentId: number

  /**
   * The accessibility of this constructor.
   */
  public accessibility: ClassParser.Accessibility

  /**
   * The parameter parsers of this constructor.
   */
  public readonly parameters: ParameterParser[]

  public constructor(data: ClassConstructorParser.Data) {
    super(data)

    const { comment, parentId, accessibility, parameters } = data

    this.comment = comment
    this.parentId = parentId
    this.accessibility = accessibility
    this.parameters = parameters
  }

  /**
   * Whether or not this constructor has a public accessibility.
   * @returns The validation boolean.
   */
  public isPublic(): boolean {
    return this.accessibility === ClassParser.Accessibility.Public
  }

  /**
   * Whether or not this constructor has a protected accessibility.
   * @since 7.0.0
   * @returns The validation boolean.
   */
  public isProtected(): boolean {
    return this.accessibility === ClassParser.Accessibility.Protected
  }

  /**
   * Whether or not this constructor has a private accessibility.
   * @since 7.0.0
   * @returns The validation boolean.
   */
  public isPrivate(): boolean {
    return this.accessibility === ClassParser.Accessibility.Private
  }

  /**
   * Converts this parser to a json compatible format.
   * @returns The json compatible format of this parser.
   */
  public override toJSON(): ClassConstructorParser.Json {
    return {
      ...super.toJSON(),
      comment: this.comment.toJSON(),
      parentId: this.parentId,
      accessibility: this.accessibility,
      parameters: this.parameters.map((parameter) => parameter.toJSON()),
    }
  }

  /**
   * Generates a new {@link ClassConstructorParser} instance from the given data.
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection,
    parentId: number
  ): ClassConstructorParser {
    const {
      kind,
      id,
      name,
      comment = { summary: [] },
      sources = [],
      flags,
      signatures = [],
    } = reflection

    if (kind !== ReflectionKind.Constructor) {
      throw new Error(
        `Expected Constructor (${
          ReflectionKind.Constructor
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}). NAME=${name};ID=${id}`
      )
    }

    const signature = signatures.find(
      (signature) => signature.kind === ReflectionKind.ConstructorSignature
    )

    if (signature === undefined) {
      throw new Error(
        `Expected Constructor (${ReflectionKind.Constructor}) with a signature, but there was none`
      )
    }

    const { parameters = [] } = signature

    return new ClassConstructorParser({
      id,
      name,
      comment: CommentParser.generateFromTypeDoc(comment),
      source: sources.length
        ? SourceParser.generateFromTypeDoc(sources[0])
        : null,
      parentId,
      accessibility: flags.isPrivate
        ? ClassParser.Accessibility.Private
        : flags.isProtected
        ? ClassParser.Accessibility.Protected
        : ClassParser.Accessibility.Public,
      parameters: parameters.map((parameter) =>
        ParameterParser.generateFromTypeDoc(parameter)
      ),
    })
  }

  /**
   * Generates a new {@link ClassConstructorParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(
    json: ClassConstructorParser.Json
  ): ClassConstructorParser {
    const { id, name, comment, source, parentId, accessibility, parameters } =
      json

    return new ClassConstructorParser({
      id,
      name,
      comment: CommentParser.generateFromJson(comment),
      source: source ? SourceParser.generateFromJson(source) : null,
      parentId,
      accessibility,
      parameters: parameters.map((parameter) =>
        ParameterParser.generateFromJson(parameter)
      ),
    })
  }
}

export namespace ClassConstructorParser {
  export interface Data extends Parser.Data {
    /**
     * The comment parser of this constructor.
     */
    comment: CommentParser

    /**
     * The accessibility of this constructor.
     */
    accessibility: ClassParser.Accessibility

    /**
     * The id of the parent class parser.
     */
    parentId: number

    /**
     * The parameter parsers of this constructor.
     */
    parameters: ParameterParser[]
  }

  export interface Json extends Parser.Json {
    /**
     * The comment parser of this constructor.
     */
    comment: CommentParser.Data

    /**
     * The accessibility of this constructor.
     */
    accessibility: ClassParser.Accessibility

    /**
     * The id of the parent class parser.
     */
    parentId: number

    /**
     * The parameter parsers of this constructor.
     */
    parameters: ParameterParser.Json[]
  }
}
