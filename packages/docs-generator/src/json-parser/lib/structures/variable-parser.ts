import { Parser } from '../structures/parser'
import { CommentParser, SourceParser } from '../structures/misc'
import { TypeParser } from '../structures/type-parsers'
import { ReflectionKind, reflectionKindToString } from '../types'
import type { JSONOutput } from 'typedoc'

/**
 * Parses data from a variable reflection.
 * @since 1.0.0
 */
export class VariableParser extends Parser {
  /**
   * The namespace parent id of this variable, if any.
   * @since 7.3.0
   */
  public readonly namespaceParentId: number | null

  /**
   * The comment parser of this variable.
   * @since 1.0.0
   */
  public readonly comment: CommentParser

  /**
   * Whether this variable is external.
   * @since 1.0.0
   */
  public readonly external: boolean

  /**
   * The type of this variable.
   * @since 1.0.0
   */
  public readonly type: TypeParser

  /**
   * The value of this variable.
   * @since 1.0.0
   */
  public readonly value: string

  public constructor(data: VariableParser.Data) {
    super(data)

    const { namespaceParentId, comment, external, type, value } = data

    this.namespaceParentId = namespaceParentId
    this.comment = comment
    this.external = external
    this.type = type
    this.value = value
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public override toJSON(): VariableParser.Json {
    return {
      ...super.toJSON(),
      namespaceParentId: this.namespaceParentId,
      comment: this.comment.toJSON(),
      external: this.external,
      type: this.type.toJSON(),
      value: this.value,
    }
  }

  /**
   * Generates a new {@link VariableParser} instance from the given data.
   * @since 1.0.0
   * @param reflection The reflection to generate the parser from.
   * @param  The  this parser belongs to.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection,
    namespaceParentId: number | null
  ): VariableParser {
    const {
      kind,
      id,
      name,
      comment = { summary: [] },
      sources = [],
      flags,
      type,
      defaultValue,
    } = reflection

    if (kind !== ReflectionKind.Variable) {
      throw new Error(
        `Expected Variable (${
          ReflectionKind.Variable
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}). NAME=${name};ID=${id}`
      )
    }

    return new VariableParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromTypeDoc(comment),
      source: sources.length
        ? SourceParser.generateFromTypeDoc(sources[0])
        : null,
      external: Boolean(flags.isExternal),
      type: TypeParser.generateFromTypeDoc(type!),
      value: defaultValue!,
    })
  }

  /**
   * Generates a new {@link VariableParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: VariableParser.Json): VariableParser {
    const {
      id,
      name,
      namespaceParentId,
      comment,
      source,
      external,
      type,
      value,
    } = json

    return new VariableParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromJson(comment),
      source: source ? SourceParser.generateFromJson(source) : null,
      external,
      type: TypeParser.generateFromJson(type),
      value,
    })
  }
}

export namespace VariableParser {
  export interface Data extends Parser.Data {
    /**
     * The namespace parent id of this variable, if any.
     * @since 7.3.0
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this variable.
     * @since 1.0.0
     */
    comment: CommentParser

    /**
     * Whether this variable is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The type of this variable.
     * @since 1.0.0
     */
    type: TypeParser

    /**
     * The value of this variable.
     * @since 1.0.0
     */
    value: string
  }

  export interface Json extends Parser.Json {
    /**
     * The namespace parent id of this variable, if any.
     * @since 7.3.0
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this constant.
     * @since 1.0.0
     */
    comment: CommentParser.Json

    /**
     * Whether this variable is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The type of this variable in a json compatible format.
     * @since 1.0.0
     */
    type: TypeParser.Json

    /**
     * The value of this variable.
     * @since 1.0.0
     */
    value: string
  }
}
