import { basename, dirname } from 'node:path'
import type { JSONOutput } from 'typedoc'

/**
 * Parses data from a source reflection.
 * @since 1.0.0
 */
export class SourceParser {
  /**
   * The line number of this source.
   * @since 1.0.0
   */
  public readonly line: number

  /**
   * The file name of this source.
   * @since 1.0.0
   */
  public readonly file: string

  /**
   * The path of this source.
   * @since 1.0.0
   */
  public readonly path: string

  /**
   * The url of this source.
   * @since 2.4.0
   */
  public readonly url: string | null

  public constructor(data: SourceParser.Data) {
    const { line, file, path, url } = data

    this.line = line
    this.file = file
    this.path = path
    this.url = url
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): SourceParser.Json {
    return {
      line: this.line,
      file: this.file,
      path: this.path,
      url: this.url,
    }
  }

  /**
   * Generates a new {@link SourceParser} instance from the given data.
   * @since 1.0.0
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.SourceReference
  ): SourceParser {
    const { line, fileName, url } = reflection

    return new SourceParser({
      line,
      file: basename(fileName),
      path: dirname(fileName),
      url: url ?? null,
    })
  }

  /**
   * Generates a new {@link ClassConstructorParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: SourceParser.Json): SourceParser {
    const { line, file, path, url } = json

    return new SourceParser({
      line,
      file,
      path,
      url,
    })
  }
}

export namespace SourceParser {
  export interface Data {
    /**
     * The line number of this source.
     * @since 1.0.0
     */
    line: number

    /**
     * The file name of this source.
     * @since 1.0.0
     */
    file: string

    /**
     * The path of this source.
     * @since 1.0.0
     */
    path: string

    /**
     * The url of this source.
     * @since 2.4.0
     */
    url: string | null
  }

  export interface Json {
    /**
     * The line number of this source.
     * @since 1.0.0
     */
    line: number

    /**
     * The file name of this source.
     * @since 1.0.0
     */
    file: string

    /**
     * The path of this source.
     * @since 1.0.0
     */
    path: string

    /**
     * The url of this source.
     * @since 2.4.0
     */
    url: string | null
  }
}
