import type { ProjectParser } from '../../structures/project-parser'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for a type operator type.
 * @since 1.0.0
 */
export class TypeOperatorTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.TypeOperator

  /**
   * The operator of this type operator type.
   * @since 1.0.0
   */
  public readonly operator: TypeOperatorTypeParser.Operator

  /**
   * The type of this type operator type.
   * @since 1.0.0
   */
  public readonly type: TypeParser

  public constructor(data: TypeOperatorTypeParser.Data) {
    const { operator, type } = data

    this.operator = operator
    this.type = type
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): TypeOperatorTypeParser.Json {
    return {
      kind: this.kind,
      operator: this.operator,
      type: this.type.toJSON(),
    }
  }

  /**
   * Converts this parser to a string.
   * @since 1.0.0
   * @returns The string representation of this parser.
   */
  public toString(project?: ProjectParser): string {
    return TypeOperatorTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<TypeOperatorTypeParser>
  ): string {
    const { parser, project } = options

    return `${parser.operator} ${parser.type.toString(project)}`
  }
}

export namespace TypeOperatorTypeParser {
  export interface Data {
    /**
     * The operator of this type operator type.
     * @since 5.0.0
     */
    operator: Operator

    /**
     * The type of this type operator type.
     * @since 5.0.0
     */
    type: TypeParser
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.TypeOperator

    /**
     * The operator of this type operator type.
     * @since 1.0.0
     */
    operator: Operator

    /**
     * The type of this type operator type in a json compatible format.
     * @since 1.0.0
     */
    type: TypeParser.Json
  }

  /**
   * The operators of a type operator type.
   */
  export enum Operator {
    KeyOf = 'keyof',

    Unique = 'unique',

    Readonly = 'readonly',
  }
}
