import type { JSONOutput } from 'typedoc'

/**
 * Parses data from a comment reflection.
 * @since 1.0.0
 */
export class CommentParser {
  /**
   * The description of this comment.
   */
  public readonly description: string | null

  /**
   * The block tags of this comment.
   */
  public readonly blockTags: CommentParser.BlockTag[]

  /**
   * The modifier tags of this comment.
   */
  public readonly modifierTags: string[]

  public constructor(data: CommentParser.Data) {
    const { description, blockTags, modifierTags } = data

    this.description = description
    this.blockTags = blockTags
    this.modifierTags = modifierTags
  }

  /**
   * The filtered `@see` tags of this comment.
   */
  public get see(): CommentParser.BlockTag[] {
    return this.blockTags.filter((tag) => tag.name === 'see')
  }

  /**
   * The filtered `@example` tags of this comment.
   */
  public get example(): CommentParser.BlockTag[] {
    return this.blockTags.filter((tag) => tag.name === 'example')
  }

  /**
   * Whether the comment has an `@deprecated` tag.
   */
  public get deprecated(): boolean {
    return this.modifierTags.some((tag) => tag === 'deprecated')
  }

  /**
   * Converts this parser to a json compatible format.
   * @returns The json compatible format of this parser.
   */
  public toJSON(): CommentParser.Json {
    return {
      description: this.description,
      blockTags: this.blockTags,
      modifierTags: this.modifierTags,
    }
  }

  /**
   * Generates a new {@link CommentParser} instance from the given data.
   * @param comment The comment to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    comment: JSONOutput.Comment
  ): CommentParser {
    const { summary, blockTags = [], modifierTags = [] } = comment

    return new CommentParser({
      description: summary.length
        ? summary
            .map((summary) =>
              summary.kind === 'inline-tag'
                ? `{${summary.tag} ${summary.text}}`
                : summary.text
            )
            .join('')
        : null,
      blockTags: blockTags.map((tag) => ({
        name: tag.name ?? tag.tag.replace(/@/, ''),
        text: tag.content
          .map((content) =>
            content.kind === 'inline-tag'
              ? `{${content.tag} ${content.text}}`
              : content.text
          )
          .join(''),
      })),
      modifierTags,
    })
  }

  /**
   * Generates a new {@link ClassConstructorParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: CommentParser.Json): CommentParser {
    const { description, blockTags, modifierTags } = json

    return new CommentParser({
      description,
      blockTags,
      modifierTags,
    })
  }
}

export namespace CommentParser {
  export interface Data {
    /**
     * The description of this comment.
     */
    description: string | null

    /**
     * The block tags of this comment.
     */
    blockTags: BlockTag[]

    /**
     * The modifier tags of this comment.
     */
    modifierTags: string[]
  }

  export interface Json {
    /**
     * The description of this comment.
     */
    description: string | null

    /**
     * The block tags of this comment.
     */
    blockTags: BlockTag[]

    /**
     * The modifier tags of this comment.
     */
    modifierTags: string[]
  }

  /**
   * A tag of a comment.
   */
  export interface BlockTag {
    /**
     * The name of this tag.
     */
    name: string

    /**
     * The text of this tag.
     */
    text: string
  }
}
