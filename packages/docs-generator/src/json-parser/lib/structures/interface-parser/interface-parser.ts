import { Parser } from '../parser'
import {
  InterfaceMethodParser,
  InterfacePropertyParser,
} from '../../structures/interface-parser'
import {
  CommentParser,
  SourceParser,
  TypeParameterParser,
} from '../../structures/misc'
import { ReflectionKind, reflectionKindToString } from '../../types'
import type { JSONOutput } from 'typedoc'

/**
 * Parses data from an interface reflection.
 * @since 1.0.0
 */
export class InterfaceParser extends Parser {
  /**
   * The namespace parent id of this interface, if any.
   * @since 7.3.0
   */
  public readonly namespaceParentId: number | null

  /**
   * The comment parser of this interface.
   * @since 1.0.0
   */
  public readonly comment: CommentParser

  /**
   * Whether this interface is external.
   * @since 1.0.0
   */
  public readonly external: boolean

  /**
   * The type parameters of this interface.
   * @since 7.0.0
   */
  public readonly typeParameters: TypeParameterParser[]

  /**
   * The property parsers of this interface.
   * @since 1.0.0
   */
  public readonly properties: InterfacePropertyParser[]

  /**
   * The method parsers of this interface.
   * @since 3.1.0
   */
  public readonly methods: InterfaceMethodParser[]

  public constructor(data: InterfaceParser.Data) {
    super(data)

    const {
      namespaceParentId,
      comment,
      external,
      typeParameters,
      properties,
      methods,
    } = data

    this.namespaceParentId = namespaceParentId
    this.comment = comment
    this.external = external
    this.typeParameters = typeParameters
    this.properties = properties
    this.methods = methods
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format of this parser.
   */
  public override toJSON(): InterfaceParser.Json {
    return {
      ...super.toJSON(),
      namespaceParentId: this.namespaceParentId,
      comment: this.comment.toJSON(),
      external: this.external,
      typeParameters: this.typeParameters.map((typeParameter) =>
        typeParameter.toJSON()
      ),
      properties: this.properties.map((parser) => parser.toJSON()),
      methods: this.methods.map((parser) => parser.toJSON()),
    }
  }

  /**
   * Generates a new {@link InterfaceParser} instance from the given data.
   * @since 1.0.0
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection,
    namespaceParentId: number | null
  ): InterfaceParser {
    const {
      kind,
      id,
      name,
      comment = { summary: [] },
      sources = [],
      flags,
      typeParameters = [],
      children = [],
    } = reflection

    if (kind !== ReflectionKind.Interface) {
      throw new Error(
        `Expected Interface (${
          ReflectionKind.Interface
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}). NAME=${name};ID=${id}`
      )
    }

    const properties = children
      .filter((child) => child.kind === ReflectionKind.Property)
      .map((child) => InterfacePropertyParser.generateFromTypeDoc(child, id))

    const methods = children
      .filter((child) => child.kind === ReflectionKind.Method)
      .map((child) => InterfaceMethodParser.generateFromTypeDoc(child, id))

    return new InterfaceParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromTypeDoc(comment),
      source: sources.length
        ? SourceParser.generateFromTypeDoc(sources[0])
        : null,
      external: Boolean(flags.isExternal),
      typeParameters: typeParameters.map((typeParameter) =>
        TypeParameterParser.generateFromTypeDoc(typeParameter)
      ),
      properties,
      methods,
    })
  }

  /**
   * Generates a new {@link InterfaceParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: InterfaceParser.Json): InterfaceParser {
    const {
      id,
      name,
      namespaceParentId,
      comment,
      source,
      external,
      typeParameters,
      properties,
      methods,
    } = json

    return new InterfaceParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromJson(comment),
      source: source ? SourceParser.generateFromJson(source) : null,
      external,
      typeParameters: typeParameters.map((typeParameter) =>
        TypeParameterParser.generateFromJson(typeParameter)
      ),
      properties: properties.map((parser) =>
        InterfacePropertyParser.generateFromJson(parser)
      ),
      methods: methods.map((parser) =>
        InterfaceMethodParser.generateFromJson(parser)
      ),
    })
  }
}

export namespace InterfaceParser {
  export interface Data extends Parser.Data {
    /**
     * The namespace parent id of this interface, if any.
     * @since 7.3.0
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this interface.
     * @since 1.0.0
     */
    comment: CommentParser

    /**
     * Whether this interface is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The type parameters of this interface.
     * @since 7.0.0
     */
    typeParameters: TypeParameterParser[]

    /**
     * The property parsers of this interface.
     * @since 1.0.0
     */
    properties: InterfacePropertyParser[]

    /**
     * The method parsers of this interface.
     * @since 3.1.0
     */
    methods: InterfaceMethodParser[]
  }

  export interface Json extends Parser.Json {
    /**
     * The namespace parent id of this interface, if any.
     * @since 7.3.0
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this interface.
     * @since 1.0.0
     */
    comment: CommentParser.Json

    /**
     * Whether this interface is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The type parameters of this interface in a JSON compatible format.
     * @since 7.0.0
     */
    typeParameters: TypeParameterParser.Json[]

    /**
     * The property parsers of this interface in a json compatible format.
     * @since 1.0.0
     */
    properties: InterfacePropertyParser.Json[]

    /**
     * The method parsers of this interface in a json compatible format.
     * @since 3.1.0
     */
    methods: InterfaceMethodParser.Json[]
  }
}
