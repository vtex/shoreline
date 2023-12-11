import type { ProjectParser } from '../../structures/project-parser'
import {
  TypeParser,
  type ReferenceTypeParser,
} from '../../structures/type-parsers'

/**
 * Parses data for a query type.
 * @since 1.0.0
 */
export class QueryTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.Query

  /**
   * The query of this query type.
   * @since 1.0.0
   */
  public readonly query: ReferenceTypeParser

  public constructor(data: QueryTypeParser.Data) {
    const { query } = data

    this.query = query
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): QueryTypeParser.Json {
    return {
      kind: this.kind,
      query: this.query.toJSON(),
    }
  }

  /**
   * Converts this parser to a string.
   * @since 1.0.0
   * @returns The string representation of this parser.
   */
  public toString(project?: ProjectParser): string {
    return QueryTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<QueryTypeParser>
  ): string {
    const { parser, project } = options

    return `typeof ${parser.query.toString(project)}`
  }
}

export namespace QueryTypeParser {
  export interface Data {
    /**
     * The query of this query type.
     * @since 5.0.0
     */
    query: ReferenceTypeParser
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.Query

    /**
     * The query of this query type in a json compatible format.
     * @since 1.0.0
     */
    query: ReferenceTypeParser.Json
  }
}
