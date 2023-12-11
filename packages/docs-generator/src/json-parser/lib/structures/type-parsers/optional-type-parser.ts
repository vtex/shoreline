import type { ProjectParser } from '../../structures/project-parser'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for an optional type.
 * @since 1.0.0
 */
export class OptionalTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.Optional

  /**
   * The type of this optional type.
   * @since 1.0.0
   */
  public readonly type: TypeParser

  public constructor(data: OptionalTypeParser.Data) {
    const { type } = data

    this.type = type
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): OptionalTypeParser.Json {
    return {
      kind: this.kind,
      type: this.type.toJSON(),
    }
  }

  /**
   * Converts this parser to a string.
   * @since 1.0.0
   * @returns The string representation of this parser.
   */
  public toString(project?: ProjectParser): string {
    return OptionalTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<OptionalTypeParser>
  ): string {
    const { parser, project } = options

    return `${TypeParser.wrap(
      parser.type,
      TypeParser.BindingPowers[TypeParser.Kind.Optional],
      project
    )}?`
  }
}

export namespace OptionalTypeParser {
  export interface Data {
    /**
     * The type of this optional type.
     * @since 5.0.0
     */
    type: TypeParser
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.Optional

    /**
     * The type of this optional type in a json compatible format.
     * @since 1.0.0
     */
    type: TypeParser.Json
  }
}
