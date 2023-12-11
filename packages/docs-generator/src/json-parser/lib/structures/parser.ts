import type { SourceParser } from '../structures/misc'

/**
 * The base parser for all top level exported parsers.
 * @since 1.0.0
 */
export abstract class Parser {
  /**
   * The identifier of this parser.
   * @since 1.0.0
   */
  public readonly id: number

  /**
   * The name of this parser.
   * @since 1.0.0
   */
  public readonly name: string

  /**
   * The source parser for this parser.
   * @since 1.0.0
   */
  public readonly source: SourceParser | null

  public constructor(data: Parser.Data) {
    const { id, name, source } = data

    this.id = id
    this.name = name
    this.source = source
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): Parser.Json {
    return {
      id: this.id,
      name: this.name,
      source: this.source ? this.source.toJSON() : null,
    }
  }
}

export namespace Parser {
  export interface Data {
    /**
     * The identifier for this parser.
     * @since 1.0.0
     */
    id: number

    /**
     * The name for this parser.
     * @since 1.0.0
     */
    name: string

    /**
     * The source parser for this parser.
     * @since 1.0.0
     */
    source: SourceParser | null
  }

  export interface Json {
    /**
     * The identifier for this parser.
     * @since 1.0.0
     */
    id: number

    /**
     * The name for this parser.
     * @since 1.0.0
     */
    name: string

    /**
     * The source parser for this parser in a json compatible format.
     * @since 1.0.0
     */
    source: SourceParser.Json | null
  }
}
