import type { ProjectParser } from '../../structures/project-parser'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for a template literal type.
 * @since 1.0.0
 */
export class TemplateLiteralTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.TemplateLiteral

  /**
   * The head of this template literal type.
   * @since 1.0.0
   */
  public readonly head: string

  /**
   * The tail of this template literal type.
   * @since 1.0.0
   */
  public readonly tail: TemplateLiteralTypeParser.Tail[]

  public constructor(data: TemplateLiteralTypeParser.Data) {
    const { head, tail } = data

    this.head = head
    this.tail = tail
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): TemplateLiteralTypeParser.Json {
    return {
      kind: this.kind,
      head: this.head,
      tail: this.tail.map((tail) => ({
        type: tail.type.toJSON(),
        text: tail.text,
      })),
    }
  }

  /**
   * Converts this parser to a string.
   * @since 1.0.0
   * @returns The string representation of this parser.
   */
  public toString(project?: ProjectParser): string {
    return TemplateLiteralTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<TemplateLiteralTypeParser>
  ): string {
    const { parser, project } = options

    return `\`${parser.head}${parser.tail
      .map((tail) => `\${${tail.type.toString(project)}}${tail.text}`)
      .join('')}\``
  }
}

export namespace TemplateLiteralTypeParser {
  export interface Data {
    /**
     * The head of this template literal type.
     * @since 5.0.0
     */
    head: string

    /**
     * The tail of this template literal type.
     * @since 5.0.0
     */
    tail: Tail[]
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.TemplateLiteral

    /**
     * The head of this template literal type.
     * @since 1.0.0
     */
    head: string

    /**
     * The tail of this template literal type.
     * @since 1.0.0
     */
    tail: Tail.Json[]
  }

  export interface Tail {
    /**
     * The type of this template literal tail type.
     * @since 1.0.0
     */
    type: TypeParser

    /**
     * The text of this template literal tail type.
     * @since 1.0.0
     */
    text: string
  }

  export namespace Tail {
    export interface Json {
      /**
       * The type of this template literal tail type in a json compatible format.
       * @since 1.0.0
       */
      type: TypeParser.Json

      /**
       * The text of this template literal tail type.
       * @since 1.0.0
       */
      text: string
    }
  }
}
