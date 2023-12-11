import { CommentParser } from '.'
import { TypeParser } from '../type-parsers'
import { ReflectionKind, reflectionKindToString } from '../../types'
import { JSONOutput } from 'typedoc'

/**
 * Parses data from a property reflection.
 * @since 8.0.0
 */
export class PropertyParser {
  /**
   * The identifier of this parser.
   * @since 8.0.0
   */
  public readonly id: number

  /**
   * The name of this property.
   * @since 8.0.0
   */
  public readonly name: string

  /**
   * The comment of this property.
   * @since 8.0.0
   */
  public readonly comment: CommentParser

  /**
   * Whether this property is readonly.
   * @since 8.2.0
   */
  public readonly readonly: boolean

  /**
   * Whether this property is optional.
   * @since 8.2.0
   */
  public readonly optional: boolean

  /**
   * The type of this property.
   * @since 8.0.0
   */
  public readonly type: TypeParser

  public constructor(data: PropertyParser.Data) {
    const { id, name, comment, readonly, optional, type } = data

    this.id = id
    this.name = name
    this.comment = comment
    this.readonly = readonly
    this.optional = optional
    this.type = type
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 8.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): PropertyParser.Json {
    return {
      id: this.id,
      name: this.name,
      comment: this.comment.toJSON(),
      readonly: this.readonly,
      optional: this.optional,
      type: this.type.toJSON(),
    }
  }

  /**
   * Generates a new {@link PropertyParser} instance from the given data.
   * @since 8.0.0
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection
  ): PropertyParser {
    const {
      kind,
      id,
      name,
      comment = { summary: [] },
      flags,
      type,
    } = reflection

    if (kind !== ReflectionKind.Property) {
      throw new Error(
        `Expected Property (${
          ReflectionKind.Property
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}). NAME=${name};ID=${id}`
      )
    }

    return new PropertyParser({
      id,
      name,
      comment: CommentParser.generateFromTypeDoc(comment),
      readonly: Boolean(flags?.isReadonly),
      optional: Boolean(flags?.isOptional),
      type: TypeParser.generateFromTypeDoc(type!),
    })
  }

  /**
   * Generates a new {@link PropertyParser} instance from the given data.
   * @since 8.0.0
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: PropertyParser.Json): PropertyParser {
    const { id, name, comment, readonly, optional, type } = json

    return new PropertyParser({
      id,
      name,
      comment: CommentParser.generateFromJson(comment),
      readonly,
      optional,
      type: TypeParser.generateFromJson(type),
    })
  }
}

export namespace PropertyParser {
  export interface Data {
    /**
     * The identifier of this parser.
     * @since 8.0.0
     */
    id: number

    /**
     * The name of this property.
     * @since 8.0.0
     */
    name: string

    /**
     * The comment of this property.
     * @since 8.0.0
     */
    comment: CommentParser

    /**
     * Whether this property is readonly.
     * @since 8.2.0
     */
    readonly: boolean

    /**
     * Whether this property is optional.
     * @since 8.2.0
     */
    optional: boolean

    /**
     * The type of this property.
     * @since 8.0.0
     */
    type: TypeParser
  }

  export interface Json {
    /**
     * The identifier of this parser in a json compatible format.
     * @since 8.0.0
     */
    id: number

    /**
     * The name of this property in a json compatible format.
     * @since 8.0.0
     */
    name: string

    /**
     * The comment of this property in a json compatible format.
     * @since 8.0.0
     */
    comment: CommentParser.Json

    /**
     * Whether this property is readonly in a json compatible format.
     * @since 8.2.0
     */
    readonly: boolean

    /**
     * Whether this property is optional in a json compatible format.
     * @since 8.2.0
     */
    optional: boolean

    /**
     * The type of this property in a json compatible format.
     * @since 8.0.0
     */
    type: TypeParser.Json
  }
}
