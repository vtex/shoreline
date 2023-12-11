import { SignatureParser } from '../../structures/misc'
import { ReflectionKind } from '../../types'
import { JSONOutput } from 'typedoc'

export class MethodParser {
  /**
   * The identifier of this parser.
   * @since 8.1.0
   */
  public readonly id: number

  /**
   * The signature parsers of this method.
   * @since 8.1.0
   */
  public readonly signatures: SignatureParser[]

  public constructor(data: MethodParser.Data) {
    const { id, signatures } = data

    this.id = id
    this.signatures = signatures
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 8.1.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): MethodParser.Json {
    return {
      id: this.id,
      signatures: this.signatures.map((signature) => signature.toJSON()),
    }
  }

  /**
   * Generates a new {@link MethodParser} instance from the given data.
   * @since 8.1.0
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection
  ): MethodParser {
    const { kind, id, signatures = [] } = reflection

    if (kind !== ReflectionKind.Method) {
      throw new Error(
        `Expected Method (${ReflectionKind.Method}), but received ${kind} (${reflection.kind}). ID=${id}`
      )
    }

    return new MethodParser({
      id,
      signatures: signatures.map((signature) =>
        SignatureParser.generateFromTypeDoc(signature)
      ),
    })
  }

  /**
   * Generates a new {@link MethodParser} instance from the given data.
   * @since 8.1.0
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: MethodParser.Json): MethodParser {
    const { id, signatures } = json

    return new MethodParser({
      id,
      signatures: signatures.map((signature) =>
        SignatureParser.generateFromJson(signature)
      ),
    })
  }
}

export namespace MethodParser {
  export interface Data {
    /**
     * The identifier of this parser.
     * @since 8.1.0
     */
    id: number

    /**
     * The signature parsers of this method.
     * @since 8.1.0
     */
    signatures: SignatureParser[]
  }

  export interface Json {
    /**
     * The identifier of this parser in a json compatible format.
     * @since 8.1.0
     */
    id: number

    /**
     * The signature parsers of this method in a json compatible format.
     * @since 8.1.0
     */
    signatures: SignatureParser.Json[]
  }
}
