import { Parser } from '../parser'
import { EnumMemberParser } from '../../structures/enum-parser'
import { CommentParser, SourceParser } from '../../structures/misc'
import { ReflectionKind, reflectionKindToString } from '../../types'
import type { JSONOutput } from 'typedoc'

/**
 * Parses data from an enum reflection.
 * @since 1.0.0
 */
export class EnumParser extends Parser {
  /**
   * The namespace parent id of this enum, if any.
   * @since 7.3.0
   */
  public readonly namespaceParentId: number | null

  /**
   * The comment parser of this enum.
   * @since 1.0.0
   */
  public readonly comment: CommentParser

  /**
   * Whether this enum is external.
   * @since 1.0.0
   */
  public readonly external: boolean

  /**
   * The property parsers of this enum.
   * @since 1.0.0
   */
  public readonly members: EnumMemberParser[]

  public constructor(data: EnumParser.Data) {
    super(data)

    const { namespaceParentId, comment, external, members } = data

    this.namespaceParentId = namespaceParentId
    this.comment = comment
    this.external = external
    this.members = members
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public override toJSON(): EnumParser.Json {
    return {
      ...super.toJSON(),
      namespaceParentId: this.namespaceParentId,
      comment: this.comment.toJSON(),
      external: this.external,
      members: this.members.map((member) => member.toJSON()),
    }
  }

  /**
   * Generates a new {@link EnumParser} instance from the given Json data.
   * @since 1.0.0
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection,
    namespaceParentId: number | null
  ): EnumParser {
    const {
      kind,
      id,
      name,
      comment = { summary: [] },
      sources = [],
      flags,
      children = [],
    } = reflection

    if (kind !== ReflectionKind.Enum) {
      throw new Error(
        `Expected Enum (${
          ReflectionKind.Enum
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}). NAME=${name};ID=${id}`
      )
    }

    const members = children
      .filter((child) => child.kind === ReflectionKind.EnumMember)
      .map((child) => EnumMemberParser.generateFromTypeDoc(child, id))

    return new EnumParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromTypeDoc(comment),
      source: sources.length
        ? SourceParser.generateFromTypeDoc(sources[0])
        : null,
      external: Boolean(flags.isExternal),
      members,
    })
  }

  /**
   * Generates a new {@link EnumParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: EnumParser.Json): EnumParser {
    const { id, name, namespaceParentId, comment, source, external, members } =
      json

    return new EnumParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromJson(comment),
      source: source ? SourceParser.generateFromJson(source) : null,
      external,
      members: members.map((property) =>
        EnumMemberParser.generateFromJson(property)
      ),
    })
  }
}

export namespace EnumParser {
  export interface Data extends Parser.Data {
    /**
     * The namespace parent id of this enum, if any.
     * @since 7.3.0
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this enum.
     * @since 1.0.0
     */
    comment: CommentParser

    /**
     * Whether this enum is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The property parsers of this enum.
     * @since 1.0.0
     */
    members: EnumMemberParser[]
  }

  export interface Json extends Parser.Json {
    /**
     * The namespace parent id of this enum, if any.
     * @since 7.3.0
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this enum.
     * @since 1.0.0
     */
    comment: CommentParser.Json

    /**
     * Whether this enum is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The property parsers of this enum in a json compatible format.
     */
    members: EnumMemberParser.Json[]
  }
}
