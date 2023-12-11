import { Parser } from '../parser'
import {
  ClassConstructorParser,
  ClassMethodParser,
  ClassPropertyParser,
} from '../../structures/class-parser'
import {
  CommentParser,
  SourceParser,
  TypeParameterParser,
} from '../../structures/misc'
import { TypeParser } from '../../structures/type-parsers'
import { ReflectionKind, reflectionKindToString } from '../../types'
import type { JSONOutput } from 'typedoc'

/**
 * Parses data from a class reflection.
 */
export class ClassParser extends Parser {
  /**
   * The namespace parent id of this class, if any.
   */
  public readonly namespaceParentId: number | null

  /**
   * The comment parser of this class.
   */
  public readonly comment: CommentParser

  /**
   * Whether this class is external.
   */
  public readonly external: boolean

  /**
   * Whether this class is abstract.
   */
  public readonly abstract: boolean

  /**
   * The `extends` type of this class.
   */
  public readonly extendsType: TypeParser | null

  /**
   * The `implements` type of this class.
   */
  public readonly implementsType: TypeParser[]

  /**
   * The type parameter parsers of this class.
   */
  public readonly typeParameters: TypeParameterParser[]

  /**
   * The constructor parser of this class.
   */
  public readonly construct: ClassConstructorParser

  /**
   * The property parsers of this class.
   */
  public readonly properties: ClassPropertyParser[]

  /**
   * The method parsers of this class.
   */
  public readonly methods: ClassMethodParser[]

  public constructor(data: ClassParser.Data) {
    super(data)

    const {
      namespaceParentId,
      comment,
      external,
      abstract,
      extendsType,
      implementsType,
      typeParameters,
      construct,
      properties,
      methods,
    } = data

    this.namespaceParentId = namespaceParentId
    this.comment = comment
    this.external = external
    this.abstract = abstract
    this.extendsType = extendsType
    this.implementsType = implementsType
    this.typeParameters = typeParameters
    this.construct = construct
    this.properties = properties
    this.methods = methods
  }

  /**
   * Converts this parser to a json compatible format.

   * @returns The json compatible format of this parser.
   */
  public override toJSON(): ClassParser.Json {
    return {
      ...super.toJSON(),
      namespaceParentId: this.namespaceParentId,
      comment: this.comment.toJSON(),
      external: this.external,
      abstract: this.abstract,
      extendsType: this.extendsType ? this.extendsType.toJSON() : null,
      implementsType: this.implementsType.map((implementsType) =>
        implementsType.toJSON()
      ),
      typeParameters: this.typeParameters.map((typeParameter) =>
        typeParameter.toJSON()
      ),
      construct: this.construct.toJSON(),
      properties: this.properties,
      methods: this.methods,
    }
  }

  /**
   * Generates a new {@link ClassParser} instance from the given data.

   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection,
    namespaceParentId: number | null
  ): ClassParser {
    const {
      kind,
      id,
      name,
      comment = { summary: [] },
      sources = [],
      flags,
      children = [],
      extendedTypes = [],
      implementedTypes = [],
      typeParameters = [],
    } = reflection

    if (kind !== ReflectionKind.Class) {
      throw new Error(
        `Expected Project (${
          ReflectionKind.Project
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}) NAME=${name};ID=${id}`
      )
    }

    const construct = children.find(
      (child) => child.kind === ReflectionKind.Constructor
    )

    if (construct === undefined) {
      throw new Error(
        `Expected Class (${ReflectionKind.Class}) with a constructor, but there was none`
      )
    }

    const properties = children
      .filter(
        (child) =>
          child.kind === ReflectionKind.Property ||
          (child.kind === ReflectionKind.Accessor && child.getSignature)
      )
      .map((child) => ClassPropertyParser.generateFromTypeDoc(child, id))

    const methods = children
      .filter((child) => child.kind === ReflectionKind.Method)
      .map((child) => ClassMethodParser.generateFromTypeDoc(child, id))

    return new ClassParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromTypeDoc(comment),
      source: sources.length
        ? SourceParser.generateFromTypeDoc(sources[0])
        : null,
      external: Boolean(flags.isExternal),
      abstract: Boolean(flags.isAbstract),
      extendsType: extendedTypes.length
        ? TypeParser.generateFromTypeDoc(extendedTypes[0])
        : null,
      implementsType: implementedTypes.map((implementedType) =>
        TypeParser.generateFromTypeDoc(implementedType)
      ),
      typeParameters: typeParameters.map((typeParameter) =>
        TypeParameterParser.generateFromTypeDoc(typeParameter)
      ),
      construct: ClassConstructorParser.generateFromTypeDoc(construct, id),
      properties,
      methods,
    })
  }

  /**
   * Generates a new {@link ClassParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: ClassParser.Json): ClassParser {
    const {
      id,
      name,
      namespaceParentId,
      comment,
      source,
      external,
      abstract,
      extendsType,
      implementsType,
      typeParameters,
      construct,
      properties,
      methods,
    } = json

    return new ClassParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromJson(comment),
      source: source ? SourceParser.generateFromJson(source) : null,
      external,
      abstract,
      extendsType: extendsType
        ? TypeParser.generateFromJson(extendsType)
        : null,
      implementsType: implementsType.map((implementedType) =>
        TypeParser.generateFromJson(implementedType)
      ),
      typeParameters: typeParameters.map((typeParameter) =>
        TypeParameterParser.generateFromJson(typeParameter)
      ),
      construct: ClassConstructorParser.generateFromJson(construct),
      properties: properties.map((property) =>
        ClassPropertyParser.generateFromJson(property)
      ),
      methods: methods.map((method) =>
        ClassMethodParser.generateFromJson(method)
      ),
    })
  }
}

export namespace ClassParser {
  export interface Data extends Parser.Data {
    /**
     * The namespace parent id of this class, if any.
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this class.
     */
    comment: CommentParser

    /**
     * Whether this class is external.
     */
    external: boolean

    /**
     * Whether this class is abstract.
     */
    abstract: boolean

    /**
     * The `extends` type of this class.
     */
    extendsType: TypeParser | null

    /**
     * The `implements` type of this class.
     */
    implementsType: TypeParser[]

    /**
     * The type parameter parsers of this class.
     */
    typeParameters: TypeParameterParser[]

    /**
     * The constructor parser of this class.
     */
    construct: ClassConstructorParser

    /**
     * The property parsers of this class.
     */
    properties: ClassPropertyParser[]

    /**
     * The method parsers of this class.
     */
    methods: ClassMethodParser[]
  }

  export interface Json extends Parser.Json {
    /**
     * The namespace parent id of this class, if any.
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this class.
     */
    comment: CommentParser.Json

    /**
     * Whether this class is external.
     */
    external: boolean

    /**
     * Whether this class is abstract.
     */
    abstract: boolean

    /**
     * The `extends` type of this class in a json compatible format.
     */
    extendsType: TypeParser.Json | null

    /**
     * The `implements` type of this class in a json compatible format.
     */
    implementsType: TypeParser.Json[]

    /**
     * The type parameter parsers of this class in a json compatible format.
     */
    typeParameters: TypeParameterParser.Json[]

    /**
     * The constructor parser of this class in a json compatible format.
     */
    construct: ClassConstructorParser.Json

    /**
     * The property parsers of this class in a json compatible format.
     */
    properties: ClassPropertyParser.Json[]

    /**
     * The method parsers of this class in a json compatible format.
     */
    methods: ClassMethodParser.Json[]
  }

  /**
   * The accessibility types of a class.

   */
  export enum Accessibility {
    Public = 'public',

    Protected = 'protected',

    Private = 'private',
  }
}
