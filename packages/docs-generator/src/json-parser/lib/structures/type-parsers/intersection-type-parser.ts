import type { ProjectParser } from '../../structures/project-parser'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for an intersection type.
 * @since 1.0.0
 */
export class IntersectionTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.Intersection

  /**
   * The types of this intersection type.
   * @since 1.0.0
   */
  public readonly types: TypeParser[]

  public constructor(data: IntersectionTypeParser.Data) {
    const { types } = data

    this.types = types
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): IntersectionTypeParser.Json {
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
    return IntersectionTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<IntersectionTypeParser>
  ): string {
    const { parser, project } = options

    return parser.types
      .map((type) =>
        TypeParser.wrap(
          type,
          TypeParser.BindingPowers[TypeParser.Kind.Intersection],
          project
        )
      )
      .join(' & ')
  }
}

export namespace IntersectionTypeParser {
  export interface Data {
    /**
     * The types of this intersection type.
     * @since 5.0.0
     */
    types: TypeParser[]
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.Intersection

    /**
     * The types of this intersection type in a json compatible format.
     * @since 1.0.0
     */
    types: TypeParser.Json[]
  }
}
