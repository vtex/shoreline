import { Parser } from './parser'
import {
  CommentParser,
  SignatureParser,
  SourceParser,
} from '../structures/misc'
import { ReflectionKind, reflectionKindToString } from '../types'
import type { JSONOutput } from 'typedoc'

/**
 * Parses data from a function reflection.
 * @since 1.0.0
 */
export class FunctionParser extends Parser {
  /**
   * The namespace parent id of this function, if any.
   * @since 7.3.0
   */
  public readonly namespaceParentId: number | null

  /**
   * The comment parser of this function.
   * @since 1.0.0
   */
  public readonly comment: CommentParser

  /**
   * Whether this function is external.
   * @since 1.0.0
   */
  public readonly external: boolean

  /**
   * The signature parsers of this function.
   * @since 1.0.0
   */
  public readonly signatures: SignatureParser[]

  public constructor(data: FunctionParser.Data) {
    super(data)

    const { namespaceParentId, comment, external, signatures } = data

    this.namespaceParentId = namespaceParentId
    this.comment = comment
    this.external = external
    this.signatures = signatures
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public override toJSON(): FunctionParser.Json {
    return {
      ...super.toJSON(),
      namespaceParentId: this.namespaceParentId,
      comment: this.comment.toJSON(),
      external: this.external,
      signatures: this.signatures.map((signature) => signature.toJSON()),
    }
  }

  /**
   * Generates a new {@link FunctionParser} instance from the given data.
   * @since 1.0.0
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection,
    namespaceParentId: number | null
  ): FunctionParser {
    const {
      kind,
      id,
      name,
      comment = { summary: [] },
      sources = [],
      flags,
      signatures = [],
    } = reflection

    if (kind !== ReflectionKind.Function) {
      throw new Error(
        `Expected Function (${
          ReflectionKind.Function
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}). NAME=${name};ID=${id}`
      )
    }

    return new FunctionParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromTypeDoc(comment),
      source: sources.length
        ? SourceParser.generateFromTypeDoc(sources[0])
        : null,
      external: Boolean(flags.isExternal),
      signatures: signatures.map((signature) =>
        SignatureParser.generateFromTypeDoc(signature)
      ),
    })
  }

  /**
   * Generates a new {@link FunctionParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: FunctionParser.Json): FunctionParser {
    const {
      id,
      name,
      namespaceParentId,
      comment,
      source,
      external,
      signatures,
    } = json

    return new FunctionParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromJson(comment),
      source: source ? SourceParser.generateFromJson(source) : null,
      external,
      signatures: signatures.map((signature) =>
        SignatureParser.generateFromJson(signature)
      ),
    })
  }
}

export namespace FunctionParser {
  export interface Data extends Parser.Data {
    /**
     * The namespace parent id of this function, if any.
     * @since 7.3.0
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this function.
     * @since 1.0.0
     */
    comment: CommentParser

    /**
     * Whether this function is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The signature parsers of this function.
     * @since 1.0.0
     */
    signatures: SignatureParser[]
  }

  export interface Json extends Parser.Json {
    /**
     * The namespace parent id of this function, if any.
     * @since 7.3.0
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this function.
     * @since 1.0.0
     */
    comment: CommentParser.Json

    /**
     * Whether this function is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The signature parsers of this function in a json compatible format.
     * @since 1.0.0
     */
    signatures: SignatureParser.Json[]
  }
}
