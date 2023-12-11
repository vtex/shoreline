import type { ProjectParser } from '../../structures/project-parser'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for a tuple type.
 * @since 1.0.0
 */
export class TupleTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.Tuple

  /**
   * The types of this tuple type.
   * @since 1.0.0
   */
  public readonly types: TypeParser[]

  public constructor(data: TupleTypeParser.Data) {
    const { types } = data

    this.types = types
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): TupleTypeParser.Json {
    return {
      kind: this.kind,
      types: this.types.map((type) => type.toJSON()),
    }
  }

  /**
   * Converts this parser to a string.
   * @since 1.0.0
   * @returns The string representation of this parser.
   */
  public toString(project?: ProjectParser): string {
    return TupleTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<TupleTypeParser>
  ): string {
    const { parser, project } = options

    return `[${parser.types.map((type) => type.toString(project)).join(', ')}]`
  }
}

export namespace TupleTypeParser {
  export interface Data {
    /**
     * The types of this tuple type.
     * @since 5.0.0
     */
    types: TypeParser[]
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.Tuple

    /**
     * The types of this tuple type in a json compatible format.
     * @since 1.0.0
     */
    types: TypeParser.Json[]
  }
}
