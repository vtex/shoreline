import type { ProjectParser } from '../../structures/project-parser'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for a named tuple member.
 * @since 1.0.0
 */
export class NamedTupleMemberTypeParser implements TypeParser {
  /**
   * The name of this named tuple member.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.NamedTupleMember

  /**
   * The name of this named tuple member.
   * @since 1.0.0
   */
  public readonly name: string

  /**
   * The type of this named tuple member.
   * @since 1.0.0
   */
  public readonly type: TypeParser

  /**
   * Whether this named tuple member is optional.
   * @since 1.0.0
   */
  public readonly optional: boolean

  public constructor(data: NamedTupleMemberTypeParser.Data) {
    const { name, type, optional } = data

    this.name = name
    this.type = type
    this.optional = optional
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): NamedTupleMemberTypeParser.Json {
    return {
      kind: this.kind,
      name: this.name,
      type: this.type.toJSON(),
      optional: this.optional,
    }
  }

  /**
   * Converts this parser to a string.
   * @since 1.0.0
   * @returns The string representation of this parser.
   */
  public toString(project?: ProjectParser): string {
    return NamedTupleMemberTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<NamedTupleMemberTypeParser>
  ): string {
    const { parser, project } = options

    return `${parser.name}${parser.optional ? '?' : ''}: ${parser.type.toString(
      project
    )}`
  }
}

export namespace NamedTupleMemberTypeParser {
  export interface Data {
    /**
     * The name of this named tuple member.
     * @since 5.0.0
     */
    name: string

    /**
     * The type of this named tuple member.
     * @since 5.0.0
     */
    type: TypeParser

    /**
     * Whether this named tuple member is optional.
     * @since 5.0.0
     */
    optional: boolean
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.NamedTupleMember

    /**
     * The name of this named tuple member.
     * @since 1.0.0
     */
    name: string

    /**
     * The type of this named tuple member in a json compatible format.
     * @since 1.0.0
     */
    type: TypeParser.Json

    /**
     * Whether this named tuple member is optional.
     * @since 1.0.0
     */
    optional: boolean
  }
}
