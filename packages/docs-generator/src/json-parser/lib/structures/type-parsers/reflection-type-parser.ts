import type { ProjectParser } from '../../structures/project-parser'
import {
  MethodParser,
  PropertyParser,
  SignatureParser,
} from '../../structures/misc'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for a reflection type.
 * @since 1.0.0
 */
export class ReflectionTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.Reflection

  /**
   * The properties of this reflection type.
   * @since 8.0.0
   */
  public properties: PropertyParser[] | null

  /**
   * The signatures of this reflection type.
   * @since 8.0.0
   */
  public signatures: SignatureParser[] | null

  /**
   * The methods of this reflection type.
   * @since 8.1.0
   */
  public methods: MethodParser[] | null

  public constructor(data: ReflectionTypeParser.Data) {
    const { properties, signatures, methods } = data

    this.properties = properties
    this.signatures = signatures
    this.methods = methods
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): ReflectionTypeParser.Json {
    return {
      kind: this.kind,
      properties: this.properties?.map((property) => property.toJSON()) ?? null,
      signatures:
        this.signatures?.map((signature) => signature.toJSON()) ?? null,
      methods: this.methods?.map((method) => method.toJSON()) ?? null,
    }
  }

  /**
   * Converts this parser to a string.
   * @since 1.0.0
   * @returns The string representation of this parser.
   */
  public toString(project?: ProjectParser): string {
    return ReflectionTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<ReflectionTypeParser>
  ): string {
    const { parser, project } = options

    return `{ ${
      parser.properties?.length
        ? `${parser.properties
            .map(
              (property) =>
                `${property.name}: ${property.type.toString(project)};`
            )
            .join(' ')} `
        : ''
    }${
      parser.signatures?.length
        ? `${parser.signatures
            .map(
              (signature) =>
                `${
                  signature.typeParameters.length
                    ? `<${signature.typeParameters
                        .map(
                          (typeParameter) =>
                            `${typeParameter.name}${
                              typeParameter.constraint
                                ? ` extends ${typeParameter.constraint.toString(
                                    project
                                  )}`
                                : ''
                            }${
                              typeParameter.default
                                ? ` = ${typeParameter.default.toString(
                                    project
                                  )}`
                                : ''
                            }`
                        )
                        .join(', ')}>`
                    : ''
                }(${
                  signature.parameters.length
                    ? signature.parameters
                        .map(
                          (parameter) =>
                            `${parameter.rest ? '...' : ''}${parameter.name}${
                              parameter.optional ? '?:' : ':'
                            } ${parameter.type.toString(project)}`
                        )
                        .join(', ')
                    : ''
                }): ${signature.returnType.toString(project)};`
            )
            .join(' ')} `
        : ''
    }${
      parser.methods?.length
        ? `${parser.methods.map((method) =>
            method.signatures.length
              ? method.signatures.length
                ? method.signatures
                    .map(
                      (signature) =>
                        `${
                          signature.typeParameters.length
                            ? `<${signature.typeParameters
                                .map(
                                  (typeParameter) =>
                                    `${typeParameter.name}${
                                      typeParameter.constraint
                                        ? ` extends ${typeParameter.constraint.toString(
                                            project
                                          )}`
                                        : ''
                                    }${
                                      typeParameter.default
                                        ? ` = ${typeParameter.default.toString(
                                            project
                                          )}`
                                        : ''
                                    }`
                                )
                                .join(', ')}>`
                            : ''
                        }(${
                          signature.parameters.length
                            ? signature.parameters
                                .map(
                                  (parameter) =>
                                    `${parameter.rest ? '...' : ''}${
                                      parameter.name
                                    }${
                                      parameter.optional ? '?:' : ':'
                                    } ${parameter.type.toString(project)}`
                                )
                                .join(', ')
                            : ''
                        }): ${signature.returnType.toString(project)};`
                    )
                    .join(' ')
                : ''
              : ''
          )}`
        : ''
    }}`
  }
}

export namespace ReflectionTypeParser {
  export interface Data {
    /**
     * The properties of this reflection type.
     * @since 8.0.0
     */
    properties: PropertyParser[] | null

    /**
     * The signatures of this reflection type.
     * @since 8.0.0
     */
    signatures: SignatureParser[] | null

    /**
     * The methods of this reflection type.
     * @since 8.1.0
     */
    methods: MethodParser[] | null
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.Reflection

    /**
     * The properties of this reflection type in a json compatible format.
     * @since 8.0.0
     */
    properties: PropertyParser.Json[] | null

    /**
     * The signatures of this reflection type in a json compatible format.
     * @since 8.0.0
     */
    signatures: SignatureParser.Json[] | null

    /**
     * The methods of this reflection type in a json compatible format.
     * @since 8.1.0
     */
    methods: MethodParser.Json[] | null
  }
}
