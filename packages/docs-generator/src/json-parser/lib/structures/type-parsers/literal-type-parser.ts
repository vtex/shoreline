import type { ProjectParser } from '../../structures/project-parser'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for a literal type.
 * @since 1.0.0
 */
export class LiteralTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.Literal

  /**
   * The value of this literal type.
   * @since 1.0.0
   */
  public readonly value: string

  public constructor(data: LiteralTypeParser.Data) {
    const { value } = data

    this.value = value
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): LiteralTypeParser.Json {
    return {
      kind: this.kind,
      value: this.value,
    }
  }

  /**
   * Converts this parser to a string.
   * @since 1.0.0
   * @returns The string representation of this parser.
   */
  public toString(project?: ProjectParser): string {
    return LiteralTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<LiteralTypeParser>
  ): string {
    const { parser } = options

    return parser.value
  }
}

export namespace LiteralTypeParser {
  export interface Data {
    /**
     * The value of this literal type.
     * @since 5.0.0
     */
    value: string
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.Literal

    /**
     * The value of this literal type.
     * @since 1.0.0
     */
    value: string
  }
}
