import type { ProjectParser } from '../../structures/project-parser'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for an inferred type.
 * @since 1.0.0
 */
export class InferredTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.Inferred

  /**
   * The type of this inferred type.
   * @since 1.0.0
   */
  public readonly type: string

  public constructor(data: InferredTypeParser.Data) {
    const { type } = data

    this.type = type
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): InferredTypeParser.Json {
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
    return InferredTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<InferredTypeParser>
  ): string {
    const { parser } = options

    return `infer ${parser.type}`
  }
}

export namespace InferredTypeParser {
  export interface Data {
    /**
     * The type of this inferred type.
     * @since 5.0.0
     */
    type: string
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.Inferred

    /**
     * The type of this inferred type.
     * @since 1.0.0
     */
    type: string
  }
}
