import { FunctionParser } from '../structures/function-parser'
import { Parser } from './parser'
import { TypeAliasParser } from './type-alias-parser'
import { VariableParser } from './variable-parser'
import { ClassParser } from '../structures/class-parser'
import { EnumParser } from '../structures/enum-parser'
import { InterfaceParser } from '../structures/interface-parser'
import { CommentParser, SourceParser } from '../structures/misc'
import {
  ReflectionKind,
  reflectionKindToString,
  type SearchResult,
} from '../types'
import type { JSONOutput } from 'typedoc'

/**
 * Parses data from a namespace reflection.
 * @since 1.0.0
 */
export class NamespaceParser extends Parser {
  /**
   * The namespace parent id of this namespace, if any.
   * @since 7.3.0
   */
  public readonly namespaceParentId: number | null

  /**
   * The comment parser of this namespace.
   * @since 1.0.0
   */
  public readonly comment: CommentParser

  /**
   * Whether this namespace is external.
   * @since 1.0.0
   */
  public readonly external: boolean

  /**
   * The class parsers of this namespace.
   * @since 1.0.0
   */
  public readonly classes: ClassParser[]

  /**
   * The enum parsers of this namespace.
   * @since 1.0.0
   */
  public readonly enums: EnumParser[]

  /**
   * The function parsers of this namespace.
   * @since 1.0.0
   */
  public readonly functions: FunctionParser[]

  /**
   * The interface parsers of this namespace.
   * @since 1.0.0
   */
  public readonly interfaces: InterfaceParser[]

  /**
   * The namespace parsers of this namespace.
   * @since 1.0.0
   */
  public readonly namespaces: NamespaceParser[]

  /**
   * The type alias parsers of this namespace.
   * @since 1.0.0
   */
  public readonly typeAliases: TypeAliasParser[]

  /**
   * The variable parsers of this namespace.
   * @since 1.0.0
   */
  public readonly variables: VariableParser[]

  public constructor(data: NamespaceParser.Data) {
    super(data)

    const {
      namespaceParentId,
      comment,
      external,
      classes,
      enums,
      functions,
      interfaces,
      namespaces,
      typeAliases,
      variables,
    } = data

    this.namespaceParentId = namespaceParentId
    this.comment = comment
    this.external = external
    this.classes = classes
    this.enums = enums
    this.functions = functions
    this.interfaces = interfaces
    this.namespaces = namespaces
    this.typeAliases = typeAliases
    this.variables = variables
  }

  public get children(): (
    | ClassParser
    | EnumParser
    | FunctionParser
    | InterfaceParser
    | NamespaceParser
    | TypeAliasParser
    | VariableParser
  )[] {
    return [
      ...this.classes,
      ...this.enums,
      ...this.functions,
      ...this.interfaces,
      ...this.namespaces,
      ...this.typeAliases,
      ...this.variables,
    ]
  }

  /**
   * Find a parser by id.
   * @since 3.0.0
   * @param id The id of the parser to find.
   * @returns The parser with the given id, or `null` if none was found.
   */
  public find(id: number): SearchResult | null {
    for (const classParser of this.classes) {
      if (classParser.id === id) {
        return classParser
      }

      if (classParser.construct.id === id) {
        return classParser.construct
      }

      for (const methodParser of classParser.methods) {
        if (methodParser.id === id) {
          return methodParser
        }

        for (const signature of methodParser.signatures) {
          if (signature.id === id) {
            return signature
          }

          for (const typeParameter of signature.typeParameters) {
            if (typeParameter.id === id) {
              return typeParameter
            }
          }

          for (const parameter of signature.parameters) {
            if (parameter.id === id) {
              return parameter
            }
          }
        }
      }

      for (const propertyParser of classParser.properties) {
        if (propertyParser.id === id) {
          return propertyParser
        }
      }
    }

    for (const enumParser of this.enums) {
      if (enumParser.id === id) {
        return enumParser
      }

      for (const propertyParser of enumParser.members) {
        if (propertyParser.id === id) {
          return propertyParser
        }
      }
    }

    for (const functionParser of this.functions) {
      if (functionParser.id === id) {
        return functionParser
      }
    }

    for (const interfaceParser of this.interfaces) {
      if (interfaceParser.id === id) {
        return interfaceParser
      }

      for (const propertyParser of interfaceParser.properties) {
        if (propertyParser.id === id) {
          return propertyParser
        }
      }
    }

    for (const namespaceParser of this.namespaces) {
      if (namespaceParser.id === id) {
        return namespaceParser
      }

      const found = namespaceParser.find(id)

      if (found) {
        return found
      }
    }

    for (const typeAliasParser of this.typeAliases) {
      if (typeAliasParser.id === id) {
        return typeAliasParser
      }
    }

    for (const variableParser of this.variables) {
      if (variableParser.id === id) {
        return variableParser
      }
    }

    return null
  }

  /**
   * Search for a parser with a given query.
   * @since 3.0.0
   * @param query The query to search with.
   * @returns An array of search results.
   */
  public search(query: string): SearchResult[] {
    const results: SearchResult[] = []
    const words = query
      .toLowerCase()
      .split(/(#|\.)/g)
      .filter((word) => word !== '.' && word !== '#')

    for (const classParser of this.classes) {
      if (classParser.name.toLowerCase().includes(words[0])) {
        if (words.length === 1) {
          results.push(classParser)

          continue
        }

        for (const methodParser of classParser.methods) {
          if (methodParser.name.toLowerCase().includes(words[1])) {
            if (words.length === 2) {
              results.push(methodParser)

              continue
            }
          }
        }

        for (const propertyParser of classParser.properties) {
          if (propertyParser.name.toLowerCase().includes(words[1])) {
            results.push(propertyParser)

            continue
          }
        }
      }
    }

    for (const enumParser of this.enums) {
      if (enumParser.name.toLowerCase().includes(words[0])) {
        if (words.length === 1) {
          results.push(enumParser)

          continue
        }

        for (const enumMemberParser of enumParser.members) {
          if (enumMemberParser.name.toLowerCase().includes(words[1])) {
            results.push(enumMemberParser)

            continue
          }
        }
      }
    }

    for (const functionParser of this.functions) {
      if (functionParser.name.toLowerCase().includes(words[0])) {
        results.push(functionParser)

        continue
      }
    }

    for (const interfaceParser of this.interfaces) {
      if (interfaceParser.name.toLowerCase().includes(words[0])) {
        if (words.length === 1) {
          results.push(interfaceParser)

          continue
        }

        for (const propertyParser of interfaceParser.properties) {
          if (propertyParser.name.toLowerCase().includes(words[1])) {
            results.push(propertyParser)

            continue
          }
        }
      }
    }

    for (const namespaceParser of this.namespaces) {
      if (namespaceParser.name.toLowerCase().includes(words[0])) {
        if (words.length === 1) {
          results.push(namespaceParser)

          continue
        }

        const subResults = namespaceParser.search(
          query.substring(words[0].length)
        )

        for (const subResult of subResults) {
          results.push(subResult)
        }
      }
    }

    for (const typeAliasParser of this.typeAliases) {
      if (typeAliasParser.name.toLowerCase().includes(words[0])) {
        results.push(typeAliasParser)

        continue
      }
    }

    for (const variableParser of this.variables) {
      if (variableParser.name.toLowerCase().includes(words[0])) {
        results.push(variableParser)

        continue
      }
    }

    return results
  }

  /**
   * Converts this parser to a json compatible format.
   * @since 1.0.0
   * @returns The json compatible format.
   */
  public override toJSON(): NamespaceParser.Json {
    return {
      ...super.toJSON(),
      namespaceParentId: this.namespaceParentId,
      comment: this.comment.toJSON(),
      external: this.external,
      classes: this.classes.map((parser) => parser.toJSON()),
      enums: this.enums.map((parser) => parser.toJSON()),
      functions: this.functions.map((parser) => parser.toJSON()),
      interfaces: this.interfaces.map((parser) => parser.toJSON()),
      namespaces: this.namespaces.map((parser) => parser.toJSON()),
      typeAliases: this.typeAliases.map((parser) => parser.toJSON()),
      variables: this.variables.map((parser) => parser.toJSON()),
    }
  }

  /**
   * Generates a new {@link NamespaceParser} instance from the given data.
   * @since 1.0.0
   * @param reflection The reflection to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromTypeDoc(
    reflection: JSONOutput.DeclarationReflection,
    namespaceParentId: number | null
  ): NamespaceParser {
    const {
      kind,
      id,
      name,
      comment = { summary: [] },
      sources = [],
      flags,
      children = [],
    } = reflection

    if (kind !== ReflectionKind.Namespace) {
      throw new Error(
        `Expected Namespace (${
          ReflectionKind.Namespace
        }), but received ${reflectionKindToString(
          kind
        )} (${kind}). NAME=${name};ID=${id}`
      )
    }

    const classes = children
      .filter((child) => child.kind === ReflectionKind.Class)
      .map((child) => ClassParser.generateFromTypeDoc(child, id))
    const enums = children
      .filter((child) => child.kind === ReflectionKind.Enum)
      .map((child) => EnumParser.generateFromTypeDoc(child, id))
    const functions = children
      .filter((child) => child.kind === ReflectionKind.Function)
      .map((child) => FunctionParser.generateFromTypeDoc(child, id))

    const interfaces = children
      .filter((child) => child.kind === ReflectionKind.Interface)
      .map((child) => InterfaceParser.generateFromTypeDoc(child, id))

    const namespaces = children
      .filter((child) => child.kind === ReflectionKind.Namespace)
      .map((child) => NamespaceParser.generateFromTypeDoc(child, id))

    const typeAliases = children
      .filter((child) => child.kind === ReflectionKind.TypeAlias)
      .map((child) => TypeAliasParser.generateFromTypeDoc(child, id))

    const variables = children
      .filter((child) => child.kind === ReflectionKind.Variable)
      .map((child) => VariableParser.generateFromTypeDoc(child, id))

    return new NamespaceParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromTypeDoc(comment),
      source: sources.length
        ? SourceParser.generateFromTypeDoc(sources[0])
        : null,
      external: Boolean(flags.isExternal),
      classes,
      enums,
      functions,
      interfaces,
      namespaces,
      typeAliases,
      variables,
    })
  }

  /**
   * Generates a new {@link NamespaceParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  public static generateFromJson(json: NamespaceParser.Json): NamespaceParser {
    const {
      id,
      name,
      namespaceParentId,
      comment,
      source,
      external,
      classes,
      variables,
      enums,
      functions,
      interfaces,
      namespaces,
      typeAliases,
    } = json

    return new NamespaceParser({
      id,
      name,
      namespaceParentId,
      comment: CommentParser.generateFromJson(comment),
      source: source ? SourceParser.generateFromJson(source) : null,
      external,
      classes: classes.map((json) => ClassParser.generateFromJson(json)),
      enums: enums.map((json) => EnumParser.generateFromJson(json)),
      functions: functions.map((json) => FunctionParser.generateFromJson(json)),
      interfaces: interfaces.map((json) =>
        InterfaceParser.generateFromJson(json)
      ),
      namespaces: namespaces.map((json) =>
        NamespaceParser.generateFromJson(json)
      ),
      typeAliases: typeAliases.map((json) =>
        TypeAliasParser.generateFromJson(json)
      ),
      variables: variables.map((json) => VariableParser.generateFromJson(json)),
    })
  }
}

export namespace NamespaceParser {
  export interface Data extends Parser.Data {
    /**
     * The namespace parent id of this namespace, if any.
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this namespace.
     * @since 1.0.0
     */
    comment: CommentParser

    /**
     * Whether this namespace is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The class parsers of this namespace.
     * @since 1.0.0
     */
    classes: ClassParser[]

    /**
     * The enum parsers of this namespace.
     * @since 1.0.0
     */
    enums: EnumParser[]

    /**
     * The function parsers of this namespace.
     * @since 1.0.0
     */
    functions: FunctionParser[]

    /**
     * The interface parsers of this namespace.
     * @since 1.0.0
     */
    interfaces: InterfaceParser[]

    /**
     * The namespace parsers of this namespace.
     * @since 1.0.0
     */
    namespaces: NamespaceParser[]

    /**
     * The type alias parsers of this namespace.
     * @since 1.0.0
     */
    typeAliases: TypeAliasParser[]

    /**
     * The variable parsers of this namespace.
     * @since 1.0.0
     */
    variables: VariableParser[]
  }

  export interface Json extends Parser.Json {
    /**
     * The namespace parent id of this namespace, if any.
     * @since 7.3.0
     */
    namespaceParentId: number | null

    /**
     * The comment parser of this namespace.
     * @since 1.0.0
     */
    comment: CommentParser.Json

    /**
     * Whether this namespace is external.
     * @since 1.0.0
     */
    external: boolean

    /**
     * The class parsers of this namespace in a json compatible format.
     * @since 1.0.0
     */
    classes: ClassParser.Json[]

    /**
     * The enum parsers of this namespace in a json compatible format.
     * @since 1.0.0
     */
    enums: EnumParser.Json[]

    /**
     * The function parsers of this namespace in a json compatible format.
     * @since 1.0.0
     */
    functions: FunctionParser.Json[]

    /**
     * The interface parsers of this namespace in a json compatible format.
     * @since 1.0.0
     */
    interfaces: InterfaceParser.Json[]

    /**
     * The namespace parsers of this namespace in a json compatible format.
     * @since 1.0.0
     */
    namespaces: Json[]

    /**
     * The type alias parsers of this namespace in a json compatible format.
     * @since 1.0.0
     */
    typeAliases: TypeAliasParser.Json[]

    /**
     * The variable parsers of this namespace in a json compatible format.
     * @since 1.0.0
     */
    variables: VariableParser.Json[]
  }
}
