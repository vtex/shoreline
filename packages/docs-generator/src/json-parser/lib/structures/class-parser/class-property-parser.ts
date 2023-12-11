import { Parser } from '../parser'
import { ClassParser } from '.'
import { CommentParser, SourceParser } from '../misc'
import { TypeParser } from '../type-parsers'
import { ReflectionKind, reflectionKindToString } from '../../types'
import type { JSONOutput } from 'typedoc'

/**
 * Parses data from a class property reflection.
 * @since 1.0.0
 */
export class ClassPropertyParser extends Parser {
  /**
   * The comment parser of this property.
   * @since 1.0.0
   */
  public readonly comment: CommentParser

  /**
   * The id of the parent class parser.
   * @since 4.0.0
   */
  public readonly parentId: number

  /**
   * The accessibility of this property.
   * @since 1.0.0
   */
  public readonly accessibility: ClassParser.Accessibility

  /**
   * Whether this property is abstract.
   * @since 1.0.0
   */
  public readonly abstract: boolean

  /**
   * Whether this property is static.
   * @since 1.0.0
   */
  public readonly static: boolean

  /**
   * Whether this property is readonly.
   * @since 1.0.0
   */
  public readonly readonly: boolean

  /**
   * Whether this property is optional.
   * @since 1.0.0
   */
  public readonly optional: boolean

  /**
   * The type parser of this property.
   * @since 1.0.0
   */
  public readonly type: TypeParser

  public constructor(data: ClassPropertyParser.Data) {
    super(data)

    const {
      comment,
      parentId,
      accessibility,
      abstract,
      static: _static,
      readonly,
      optional,
      type,
    } = data

    this.comment = comment
    this.parentId = parentId
    this.accessibility = accessibility
    this.abstract = abstract
    this.static = _static
    this.readonly = readonly
    this.optional = optional
    this.type = type
  }

  /**
   * Whether or not this property has a public accessibility.
   * @since 7.0.0
   * @returns The validation boolean.
   */
  public isPublic(): boolean {
    return this.accessibility === ClassParser.Accessibility.Public
  }

  /**
   * Whether or not this property has a protected accessibility.
   * @since 7.0.0
   * @returns The validation boolean.
   */
  public isProtected(): boolean {
    return this.accessibility === ClassParser.Accessibility.Protected
  }

  /**
   * Whether or not this property has a private accessibility.
   * @since 7.0.0
   * @returns The validation boolean.
   */
  public isPrivate(): boolean {
    return this.accessibility === ClassParser.Accessibility.Private
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public override toJSON(): ClassPropertyParser.Json {
    return {
      ...super.toJSON(),
      comment: this.comment.toJSON(),
      parentId: this.parentId,
      accessibility: this.accessibility,
      abstract: this.abstract,
      static: this.static,
      readonly: this.readonly,
      optional: this.optional,
      type: this.type.toJSON(),
    }
  }

  /**
   * Generates a new {@link ClassPropertyParser} instance from the given data.
   * @since 1.0.0
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection,
    parentId: number
  ): ClassPropertyParser {
    const {
      kind,
      id,
      name,
      comment = { summary: [] },
      sources = [],
      type,
      flags,
      getSignature,
    } = reflection

    if (kind !== ReflectionKind.Property && kind !== ReflectionKind.Accessor) {
      throw new Error(
        `Expected Property (${ReflectionKind.Property}) or Accessor (${
          ReflectionKind.Accessor
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}). NAME=${name};ID=${id}`
      )
    }

    if (kind === ReflectionKind.Accessor) {
      if (getSignature === undefined) {
        throw new Error(
          `Expected Accessor (${ReflectionKind.Accessor}) with a getter, but there was none`
        )
      }

      const { id, name, comment = { summary: [] }, type, flags } = getSignature

      return new ClassPropertyParser({
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
        abstract: Boolean(flags.isAbstract),
        static: Boolean(flags.isStatic),
        readonly: Boolean(flags.isReadonly),
        optional: Boolean(flags.isOptional),
        type: TypeParser.generateFromTypeDoc(type!),
      })
    }

    return new ClassPropertyParser({
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
      abstract: Boolean(flags.isAbstract),
      static: Boolean(flags.isStatic),
      readonly: Boolean(flags.isReadonly),
      optional: Boolean(flags.isOptional),
      type: TypeParser.generateFromTypeDoc(type!),
    })
  }

  /**
   * Generates a new {@link ClassPropertyParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(
    json: ClassPropertyParser.Json
  ): ClassPropertyParser {
    const {
      id,
      name,
      comment,
      source,
      parentId,
      accessibility,
      abstract,
      static: _static,
      readonly,
      optional,
      type,
    } = json

    return new ClassPropertyParser({
      id,
      name,
      comment: CommentParser.generateFromJson(comment),
      source: source ? SourceParser.generateFromJson(source) : null,
      parentId,
      accessibility,
      abstract,
      static: _static,
      readonly,
      optional,
      type: TypeParser.generateFromJson(type),
    })
  }
}

export namespace ClassPropertyParser {
  export interface Data extends Parser.Data {
    /**
     * The comment parser of this property.
     * @since 1.0.0
     */
    comment: CommentParser

    /**
     * The id of the parent class parser.
     * @since 4.0.0
     */
    parentId: number

    /**
     * The accessibility of this property.
     * @since 1.0.0
     */
    accessibility: ClassParser.Accessibility

    /**
     * Whether this property is abstract.
     * @since 1.0.0
     */
    abstract: boolean

    /**
     * Whether this property is static.
     * @since 1.0.0
     */
    static: boolean

    /**
     * Whether this property is readonly.
     * @since 1.0.0
     */
    readonly: boolean

    /**
     * Whether this property is optional.
     * @since 1.0.0
     */
    optional: boolean

    /**
     * The type parser of this property.
     * @since 1.0.0
     */
    type: TypeParser
  }

  export interface Json extends Parser.Json {
    /**
     * The comment parser of this property.
     * @since 1.0.0
     */
    comment: CommentParser.Json

    /**
     * The id of the parent class parser.
     * @since 4.0.0
     */
    parentId: number

    /**
     * The accessibility of this property.
     * @since 1.0.0
     */
    accessibility: ClassParser.Accessibility

    /**
     * Whether this property is abstract.
     * @since 1.0.0
     */
    abstract: boolean

    /**
     * Whether this property is static.
     * @since 1.0.0
     */
    static: boolean

    /**
     * Whether this property is readonly.
     * @since 1.0.0
     */
    readonly: boolean

    /**
     * Whether this property is optional.
     * @since 1.0.0
     */
    optional: boolean

    /**
     * The type parser of this property in a json compatible format.
     * @since 1.0.0
     */
    type: TypeParser.Json
  }
}
