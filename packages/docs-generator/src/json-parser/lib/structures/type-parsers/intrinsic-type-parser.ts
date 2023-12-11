import type { ProjectParser } from '../../structures/project-parser'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for an intrinsic type.
 * @since 1.0.0
 */
export class IntrinsicTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.Intrinsic

  /**
   * The type of this intrinsic type.
   * @since 1.0.0
   */
  public readonly type: string

  public constructor(data: IntrinsicTypeParser.Data) {
    const { type } = data

    this.type = type
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): IntrinsicTypeParser.Json {
    return {
      kind: this.kind,
      type: this.type,
    }
  }

  /**
   * Converts this parser to a string.
   * @since 1.0.0
   * @returns The string representation of this parser.
   */
  public toString(project?: ProjectParser): string {
    return IntrinsicTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<IntrinsicTypeParser>
  ): string {
    const { parser } = options

    return parser.type
  }
}

export namespace IntrinsicTypeParser {
  export interface Data {
    /**
     * The type of this intrinsic type.
     * @since 5.0.0
     */
    type: string
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.Intrinsic

    /**
     * The type of this intrinsic type.
     * @since 1.0.0
     */
    type: string
  }
}
