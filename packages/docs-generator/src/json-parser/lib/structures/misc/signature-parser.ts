import {
  CommentParser,
  ParameterParser,
  TypeParameterParser,
} from '../../structures/misc'
import { TypeParser } from '../../structures/type-parsers'
import { ReflectionKind, reflectionKindToString } from '../../types'
import type { JSONOutput } from 'typedoc'

/**
 * Parses data from a signature reflection.
 * @since 1.0.0
 */
export class SignatureParser {
  /**
   * The identifier of this parser.
   * @since 1.0.0
   */
  public readonly id: number

  /**
   * The name of this signature.
   * @since 1.0.0
   */
  public readonly name: string

  /**
   * The comment parser of this signature.
   * @since 2.3.0
   */
  public readonly comment: CommentParser

  /**
   * The type parameters of this signature.
   * @since 1.0.0
   */
  public readonly typeParameters: TypeParameterParser[]

  /**
   * The parameters of this signature.
   * @since 1.0.0
   */
  public readonly parameters: ParameterParser[]

  /**
   * The return type of this signature.
   * @since 1.0.0
   */
  public readonly returnType: TypeParser

  public constructor(data: SignatureParser.Data) {
    const { id, name, comment, typeParameters, parameters, returnType } = data

    this.id = id
    this.name = name
    this.comment = comment
    this.typeParameters = typeParameters
    this.parameters = parameters
    this.returnType = returnType
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): SignatureParser.Json {
    return {
      id: this.id,
      name: this.name,
      comment: this.comment.toJSON(),
      typeParameters: this.typeParameters.map((typeParameter) =>
        typeParameter.toJSON()
      ),
      parameters: this.parameters.map((parameter) => parameter.toJSON()),
      returnType: this.returnType.toJSON(),
    }
  }

  /**
   * Generates a new {@link SignatureParser} instance from the given data.
   * @since 1.0.0
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.SignatureReflection
  ): SignatureParser {
    const {
      kind,
      id,
      name,
      comment = { summary: [] },
      typeParameter: typeParameters = [],
      parameters = [],
      type,
    } = reflection

    if (
      ![
        ReflectionKind.CallSignature,
        ReflectionKind.ConstructorSignature,
        ReflectionKind.IndexSignature,
      ].includes(kind)
    ) {
      throw new Error(
        `Expected Signature (${ReflectionKind.CallSignature}, ${
          ReflectionKind.ConstructorSignature
        }, ${
          ReflectionKind.IndexSignature
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}). NAME=${name};ID=${id}`
      )
    }

    return new SignatureParser({
      id,
      name,
      comment: CommentParser.generateFromTypeDoc(comment),
      typeParameters: typeParameters.map((typeParameter) =>
        TypeParameterParser.generateFromTypeDoc(typeParameter)
      ),
      parameters: parameters.map((parameter) =>
        ParameterParser.generateFromTypeDoc(parameter)
      ),
      returnType: TypeParser.generateFromTypeDoc(type!),
    })
  }

  /**
   * Generates a new {@link ClassConstructorParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: SignatureParser.Json): SignatureParser {
    const { id, name, comment, typeParameters, parameters, returnType } = json

    return new SignatureParser({
      id,
      name,
      comment: CommentParser.generateFromJson(comment),
      typeParameters: typeParameters.map((typeParameter) =>
        TypeParameterParser.generateFromJson(typeParameter)
      ),
      parameters: parameters.map((parameter) =>
        ParameterParser.generateFromJson(parameter)
      ),
      returnType: TypeParser.generateFromJson(returnType),
    })
  }
}

export namespace SignatureParser {
  export interface Data {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    id: number

    /**
     * The name of this signature.
     * @since 1.0.0
     */
    name: string

    /**
     * The comment of this signature.
     * @since 2.3.0
     */
    comment: CommentParser

    /**
     * The type parameters of this signature.
     * @since 1.0.0
     */
    typeParameters: TypeParameterParser[]

    /**
     * The parameters of this signature.
     * @since 1.0.0
     */
    parameters: ParameterParser[]

    /**
     * The return type of this signature.
     * @since 1.0.0
     */
    returnType: TypeParser
  }

  export interface Json {
    /**
     * The identifier of this parser.
     * @since 1.0.0
     */
    id: number

    /**
     * The name of this signature.
     * @since 1.0.0
     */
    name: string

    /**
     * The comment of this signature.
     * @since 2.3.0
     */
    comment: CommentParser.Json

    /**
     * The type parameters of this signature in a json compatible format.
     * @since 1.0.0
     */
    typeParameters: TypeParameterParser.Json[]

    /**
     * The parameters of this signature in a json compatible format.
     * @since 1.0.0
     */
    parameters: ParameterParser.Json[]

    /**
     * The return type of this signature in a json compatible format.
     * @since 1.0.0
     */
    returnType: TypeParser.Json
  }
}
