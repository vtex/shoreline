import { Parser } from '../structures/parser'
import {
  CommentParser,
  SourceParser,
  TypeParameterParser,
} from '../structures/misc'
import { TypeParser } from '../structures/type-parsers'
import { ReflectionKind, reflectionKindToString } from '../types'
import type { JSONOutput } from 'typedoc'

/**
 * Parses data from a type alias reflection.
 * @since 1.0.0
 */
export class TypeAliasParser extends Parser {
  /**
   * The namespace parent id of this type alias, if any.
   * @since 7.3.0
   */
  public readonly namespaceParentId: number | null

  /**
   * The comment parser of this type alias.
   * @since 1.0.0
   */
  public readonly comment: CommentParser

  /**
   * Whether this type alias is external.
   * @since 1.0.0
   */
  public readonly external: boolean

  /**
   * The type parameters of this type alias.
   * @since 1.0.0
   */
  public readonly typeParameters: TypeParameterParser[]

  /**
   * The type of this type alias.
   * @since 1.0.0
   */
  public readonly type: TypeParser

  public constructor(data: TypeAliasParser.Data) {
    super(data)

    const { namespaceParentId, comment, external, typeParameters, type } = data

    this.namespaceParentId = namespaceParentId
    this.comment = comment
    this.external = external
    this.typeParameters = typeParameters
    this.type = type
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public override toJSON(): TypeAliasParser.Json {
    return {
      ...super.toJSON(),
      namespaceParentId: this.namespaceParentId,
      comment: this.comment.toJSON(),
      external: this.external,
      typeParameters: this.typeParameters.map((typeParameter) =>
        typeParameter.toJSON()
      ),
      type: this.type.toJSON(),
    }
  }

  /**
   * Generates a new {@link TypeAliasParser} instance from the given data.
   * @since 1.0.0
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection,
    namespaceParentId: number | null
  ): TypeAliasParser {
    const {
      kind,
      id,
      name,
      comment = { summary: [] },
      sources = [],
      flags,
      type,
      typeParameters = [],
    } = reflection

    if (kind !== ReflectionKind.TypeAlias) {
      throw new Error(
        `Expected TypeAlias (${
          ReflectionKind.TypeAlias
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}). NAME=${name};ID=${id}`
      )
    }

    return new TypeAliasParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromTypeDoc(comment),
      source: sources.length
        ? SourceParser.generateFromTypeDoc(sources[0])
        : null,
      external: Boolean(flags.isExternal),
      typeParameters: typeParameters.map((typeParameter) =>
        TypeParameterParser.generateFromTypeDoc(typeParameter)
      ),
      type: TypeParser.generateFromTypeDoc(type!),
    })
  }

  /**
   * Generates a new {@link TypeAliasParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: TypeAliasParser.Json): TypeAliasParser {
    const {
      id,
      name,
      namespaceParentId,
      comment,
      source,
      external,
      typeParameters,
      type,
    } = json

    return new TypeAliasParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromJson(comment),
      source: source ? SourceParser.generateFromJson(source) : null,
      external,
      typeParameters: typeParameters.map((typeParameter) =>
        TypeParameterParser.generateFromJson(typeParameter)
      ),
      type: TypeParser.generateFromJson(type),
    })
  }
}

export namespace TypeAliasParser {
  export interface Data extends Parser.Data {
    /**
     * The namespace parent id of this type alias, if any.
     * @since 7.3.0
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this type alias.
     * @since 1.0.0
     */
    comment: CommentParser

    /**
     * Whether this type alias is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The type parameters of this type alias.
     * @since 1.0.0
     */
    typeParameters: TypeParameterParser[]

    /**
     * The type of this type alias.
     * @since 1.0.0
     */
    type: TypeParser
  }

  export interface Json extends Parser.Json {
    /**
     * The namespace parent id of this type alias, if any.
     * @since 7.3.0
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this type alias.
     * @since 1.0.0
     */
    comment: CommentParser.Json

    /**
     * Whether this type alias is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The type parameters of this type alias in a json compatible format.
     * @since 1.0.0
     */
    typeParameters: TypeParameterParser.Json[]

    /**
     * The type of this type alias in a json compatible format.
     */
    type: TypeParser.Json
  }
}
