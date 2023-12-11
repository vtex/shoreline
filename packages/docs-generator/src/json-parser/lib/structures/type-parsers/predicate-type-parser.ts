import type { ProjectParser } from '../../structures/project-parser'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for a predicate type.
 * @since 1.0.0
 */
export class PredicateTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.Predicate

  /**
   * Whether this predicate type asserts a value.
   * @since 1.0.0
   */
  public readonly asserts: boolean

  /**
   * The name of this predicate type.
   * @since 1.0.0
   */
  public readonly name: string

  /**
   * The type of this predicate type.
   *
   * If this {@link PredicateTypeParser.asserts} is `false` this will not be `null`
   */
  public readonly type: TypeParser | null

  public constructor(data: PredicateTypeParser.Data) {
    const { asserts, name, type } = data

    this.asserts = asserts
    this.name = name
    this.type = type
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): PredicateTypeParser.Json {
    return {
      kind: this.kind,
      asserts: this.asserts,
      name: this.name,
      type: this.type ? this.type.toJSON() : null,
    }
  }

  /**
   * Converts this parser to a string.
   * @since 1.0.0
   * @returns The string representation of this parser.
   */
  public toString(project?: ProjectParser): string {
    return PredicateTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<PredicateTypeParser>
  ): string {
    const { parser, project } = options

    return parser.asserts
      ? `asserts ${parser.name}`
      : `${parser.name} is ${parser.type!.toString(project)}`
  }
}

export namespace PredicateTypeParser {
  export interface Data {
    /**
     * Whether this predicate type asserts a value.
     * @since 5.0.0
     */
    asserts: boolean

    /**
     * The name of this predicate type.
     * @since 5.0.0
     */
    name: string

    /**
     * The type of this predicate type.
     *
     * If this {@link PredicateTypeParser.asserts} is `false` this will not be `null`
     * @since 5.0.0
     */
    type: TypeParser | null
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.Predicate

    /**
     * Whether this predicate type asserts a value.
     * @since 1.0.0
     */
    asserts: boolean

    /**
     * The name of this predicate type.
     * @since 1.0.0
     */
    name: string

    /**
     * The type of this predicate type in a json compatible format.
     *
     * If this {@link PredicateTypeParser.asserts} is `false` this will not be `null`
     * @since 1.0.0
     */
    type: TypeParser.Json | null
  }
}
