import type { ProjectParser } from '../../structures/project-parser'
import { TypeParser } from '../../structures/type-parsers'

/**
 * Parses data for a mapped type.
 * @since 1.0.0
 */
export class MappedTypeParser implements TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  public readonly kind = TypeParser.Kind.Mapped

  /**
   * The parameter name of this mapped type.
   * @since 1.0.0
   */
  public readonly parameter: string

  /**
   * The parameter type of this mapped type.
   * @since 1.0.0
   */
  public readonly parameterType: TypeParser

  /**
   * The name type of this mapped type.
   * @since 1.0.0
   */
  public readonly nameType: TypeParser | null

  /**
   * The template type of this mapped type.
   * @since 1.0.0
   */
  public readonly templateType: TypeParser

  /**
   * The readonly modifier of this mapped type.
   * @since 1.0.0
   */
  public readonly readonly: MappedTypeParser.Modifier | null

  /**
   * The optional modifier of this mapped type.
   * @since 1.0.0
   */
  public readonly optional: MappedTypeParser.Modifier | null

  public constructor(data: MappedTypeParser.Data) {
    const {
      parameter,
      parameterType,
      nameType,
      templateType,
      readonly,
      optional,
    } = data

    this.parameter = parameter
    this.parameterType = parameterType
    this.nameType = nameType
    this.templateType = templateType
    this.readonly = readonly
    this.optional = optional
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public toJSON(): MappedTypeParser.Json {
    return {
      kind: this.kind,
      parameter: this.parameter,
      parameterType: this.parameterType.toJSON(),
      nameType: this.nameType ? this.nameType.toJSON() : null,
      templateType: this.templateType.toJSON(),
      readonly: this.readonly,
      optional: this.optional,
    }
  }

  /**
   * Converts this parser to a string.
   * @since 1.0.0
   * @returns The string representation of this parser.
   */
  public toString(project?: ProjectParser): string {
    return MappedTypeParser.formatToString({ parser: this, project })
  }

  /**
   * Formats this type parser to a string.
   * @since 4.0.0
   * @param options The options to format this type parser to a string.
   * @returns The string representation of this parser.
   */
  public static formatToString(
    options: TypeParser.FormatToStringOptions<MappedTypeParser>
  ): string {
    const { parser, project } = options
    const readonly =
      parser.readonly === MappedTypeParser.Modifier.Add
        ? 'readonly'
        : parser.readonly === MappedTypeParser.Modifier.Remove
        ? '-readonly'
        : ''

    const optional =
      parser.optional === MappedTypeParser.Modifier.Add
        ? '?'
        : parser.optional === MappedTypeParser.Modifier.Remove
        ? '-?'
        : ''

    return `{ ${readonly}[${
      parser.parameter
    } in ${parser.parameterType.toString(
      project
    )}]${optional}: ${parser.templateType.toString(project)} }`
  }
}

export namespace MappedTypeParser {
  export interface Data {
    /**
     * The parameter name of this mapped type.
     * @since 5.0.0
     */
    parameter: string

    /**
     * The parameter type of this mapped type.
     * @since 5.0.0
     */
    parameterType: TypeParser

    /**
     * The name type of this mapped type.
     * @since 5.0.0
     */
    nameType: TypeParser | null

    /**
     * The template type of this mapped type.
     * @since 5.0.0
     */
    templateType: TypeParser

    /**
     * The readonly modifier of this mapped type.
     * @since 5.0.0
     */
    readonly: Modifier | null

    /**
     * The optional modifier of this mapped type.
     * @since 5.0.0
     */
    optional: Modifier | null
  }

  export interface Json extends TypeParser.Json {
    kind: TypeParser.Kind.Mapped

    /**
     * The parameter name of this mapped type.
     * @since 1.0.0
     */
    parameter: string

    /**
     * The parameter type of this mapped type in a json compatible format.
     * @since 1.0.0
     */
    parameterType: TypeParser.Json

    /**
     * The name type of this mapped type in a json compatible format.
     * @since 1.0.0
     */
    nameType: TypeParser.Json | null

    /**
     * The template type of this mapped type in a json compatible format.
     * @since 1.0.0
     */
    templateType: TypeParser.Json

    /**
     * The readonly modifier of this mapped type.
     * @since 1.0.0
     */
    readonly: Modifier | null

    /**
     * The optional modifier of this mapped type.
     * @since 1.0.0
     */
    optional: Modifier | null
  }

  /**
   * The modifier for a mapped type.
   */
  export enum Modifier {
    Add = '+',

    Remove = '-',
  }
}
