import type { ProjectParser } from '../../structures/project-parser'
import {
  MethodParser,
  PropertyParser,
  SignatureParser,
} from '../../structures/misc'
import {
  ArrayTypeParser,
  ConditionalTypeParser,
  IndexedAccessTypeParser,
  InferredTypeParser,
  IntersectionTypeParser,
  IntrinsicTypeParser,
  LiteralTypeParser,
  MappedTypeParser,
  NamedTupleMemberTypeParser,
  OptionalTypeParser,
  PredicateTypeParser,
  QueryTypeParser,
  ReferenceTypeParser,
  ReflectionTypeParser,
  RestTypeParser,
  TemplateLiteralTypeParser,
  TupleTypeParser,
  TypeOperatorTypeParser,
  UnionTypeParser,
  UnknownTypeParser,
} from '../../structures/type-parsers'
import { ReflectionKind } from '../../types'
import { type JSONOutput } from 'typedoc'

/**
 * The base interface for all type parsers.
 * @since 1.0.0
 */
export interface TypeParser {
  /**
   * The kind of type this parser is for.
   * @since 1.0.0
   */
  kind: TypeParser.Kind

  /**
   * The method to convert this type parser to a json compatible format.
   * @since 1.0.0
   */
  toJSON(): TypeParser.Json

  /**
   * The method to convert this type parser to a string.
   * @param project The optional project parser to use.
   * @since 1.0.0
   */
  toString(project?: ProjectParser): string
}

export namespace TypeParser {
  /**
   * Generates a new {@link TypeParser} instance from the given data.
   * @since 1.0.0
   * @param type The type to generate the parser from.
   * @returns The generated parser.
   */
  export function generateFromTypeDoc(
    type:
      | (
          | JSONOutput.ArrayType
          | JSONOutput.ConditionalType
          | JSONOutput.IndexedAccessType
          | JSONOutput.InferredType
          | JSONOutput.IntersectionType
          | JSONOutput.IntrinsicType
          | JSONOutput.LiteralType
          | JSONOutput.OptionalType
          | JSONOutput.PredicateType
          | JSONOutput.QueryType
          | JSONOutput.ReferenceType
          | JSONOutput.ReflectionType
          | JSONOutput.RestType
          | JSONOutput.TupleType
          | JSONOutput.TypeOperatorType
          | JSONOutput.UnionType
          | JSONOutput.UnknownType
          | JSONOutput.MappedType
          | JSONOutput.TemplateLiteralType
          | JSONOutput.NamedTupleMemberType
        )
      | JSONOutput.SomeType
  ): TypeParser {
    switch (type.type) {
      case 'array': {
        const { elementType } = type

        return new ArrayTypeParser({ type: generateFromTypeDoc(elementType) })
      }

      case 'conditional': {
        const { checkType, extendsType, trueType, falseType } = type

        return new ConditionalTypeParser({
          checkType: generateFromTypeDoc(checkType),
          extendsType: generateFromTypeDoc(extendsType),
          trueType: generateFromTypeDoc(trueType),
          falseType: generateFromTypeDoc(falseType),
        })
      }

      case 'indexedAccess': {
        const { objectType, indexType } = type

        return new IndexedAccessTypeParser({
          objectType: generateFromTypeDoc(objectType),
          indexType: generateFromTypeDoc(indexType),
        })
      }

      case 'inferred': {
        const { name } = type

        return new InferredTypeParser({ type: name })
      }

      case 'intersection': {
        const { types } = type

        return new IntersectionTypeParser({
          types: types.map((type) => generateFromTypeDoc(type)),
        })
      }

      case 'intrinsic': {
        const { name } = type

        return new IntrinsicTypeParser({ type: name })
      }

      case 'literal': {
        const { value } = type

        return new LiteralTypeParser({
          value:
            (typeof value === 'object' && value !== null
              ? value.value
              : value
            )?.toString() ?? 'null',
        })
      }

      case 'mapped': {
        const {
          parameter,
          parameterType,
          nameType,
          templateType,
          optionalModifier,
          readonlyModifier,
        } = type

        return new MappedTypeParser({
          parameter,
          parameterType: generateFromTypeDoc(parameterType),
          nameType: nameType ? generateFromTypeDoc(nameType) : null,
          templateType: generateFromTypeDoc(templateType),
          optional: (optionalModifier ?? null) as MappedTypeParser.Modifier,
          readonly: (readonlyModifier ?? null) as MappedTypeParser.Modifier,
        })
      }

      case 'namedTupleMember': {
        const { element, isOptional, name } = type

        return new NamedTupleMemberTypeParser({
          name,
          type: generateFromTypeDoc(element),
          optional: isOptional ?? false,
        })
      }

      case 'optional': {
        const { elementType } = type

        return new OptionalTypeParser({
          type: generateFromTypeDoc(elementType),
        })
      }

      case 'predicate': {
        const { asserts, name, targetType } = type

        return new PredicateTypeParser({
          asserts,
          name,
          type: targetType ? generateFromTypeDoc(targetType) : null,
        })
      }

      case 'query': {
        const { queryType } = type

        return new QueryTypeParser({
          query: generateFromTypeDoc(queryType) as ReferenceTypeParser,
        })
      }

      case 'reference': {
        const {
          target,
          name,
          package: _package,
          qualifiedName,
          typeArguments = [],
        } = type

        return new ReferenceTypeParser({
          id: typeof target === 'number' ? target : null,
          name: qualifiedName ?? name,
          packageName: _package ?? null,
          typeArguments: typeArguments.map((type) => generateFromTypeDoc(type)),
        })
      }

      case 'reflection': {
        const { declaration } = type
        const properties =
          declaration.children
            ?.filter((child) => child.kind === ReflectionKind.Property)
            .map((child) => PropertyParser.generateFromTypeDoc(child)) ?? null

        const methods =
          declaration.children
            ?.filter((child) => child.kind === ReflectionKind.Method)
            .map((child) => MethodParser.generateFromTypeDoc(child)) ?? null

        return new ReflectionTypeParser({
          properties: properties?.length ? properties : null,
          signatures:
            declaration.signatures?.map((signature) =>
              SignatureParser.generateFromTypeDoc(signature)
            ) ?? null,
          methods: methods?.length ? methods : null,
        })
      }

      case 'rest': {
        const { elementType } = type

        return new RestTypeParser({ type: generateFromTypeDoc(elementType) })
      }

      case 'templateLiteral': {
        const { head, tail } = type

        return new TemplateLiteralTypeParser({
          head,
          tail: tail.map(([type, text]) => ({
            type: generateFromTypeDoc(type),
            text,
          })),
        })
      }

      case 'tuple': {
        const { elements = [] } = type

        return new TupleTypeParser({
          types: elements.map((type) => generateFromTypeDoc(type)),
        })
      }

      case 'typeOperator': {
        const { operator, target } = type

        return new TypeOperatorTypeParser({
          operator: operator as TypeOperatorTypeParser.Operator,
          type: generateFromTypeDoc(target),
        })
      }

      case 'union': {
        const { types } = type

        return new UnionTypeParser({
          types: types.map((type) => generateFromTypeDoc(type)),
        })
      }

      case 'unknown': {
        const { name } = type

        return new UnknownTypeParser({ name })
      }
    }
  }

  /**
   * Generates a new {@link TypeParser} instance from the given data.
   * @param json The json to generate the parser from.
   * @returns The generated parser.
   */
  export function generateFromJson(json: Json): TypeParser {
    switch (json.kind) {
      case Kind.Array: {
        const { type } = json as ArrayTypeParser.Json

        return new ArrayTypeParser({ type: generateFromJson(type) })
      }

      case Kind.Conditional: {
        const { checkType, extendsType, trueType, falseType } =
          json as ConditionalTypeParser.Json

        return new ConditionalTypeParser({
          checkType: generateFromJson(checkType),
          extendsType: generateFromJson(extendsType),
          trueType: generateFromJson(trueType),
          falseType: generateFromJson(falseType),
        })
      }

      case Kind.IndexedAccess: {
        const { objectType, indexType } = json as IndexedAccessTypeParser.Json

        return new IndexedAccessTypeParser({
          objectType: generateFromJson(objectType),
          indexType: generateFromJson(indexType),
        })
      }

      case Kind.Inferred: {
        const { type } = json as InferredTypeParser.Json

        return new InferredTypeParser({ type })
      }

      case Kind.Intersection: {
        const { types } = json as IntersectionTypeParser.Json

        return new IntersectionTypeParser({
          types: types.map((type) => generateFromJson(type)),
        })
      }

      case Kind.Intrinsic: {
        const { type } = json as IntrinsicTypeParser.Json

        return new IntrinsicTypeParser({ type })
      }

      case Kind.Literal: {
        const { value } = json as LiteralTypeParser.Json

        return new LiteralTypeParser({ value })
      }

      case Kind.Mapped: {
        const {
          parameter,
          parameterType,
          nameType,
          templateType,
          optional,
          readonly,
        } = json as MappedTypeParser.Json

        return new MappedTypeParser({
          parameter,
          parameterType: generateFromJson(parameterType),
          nameType: nameType ? generateFromJson(nameType) : null,
          templateType: generateFromJson(templateType),
          optional,
          readonly,
        })
      }

      case Kind.NamedTupleMember: {
        const { type, optional, name } = json as NamedTupleMemberTypeParser.Json

        return new NamedTupleMemberTypeParser({
          name,
          type: generateFromJson(type),
          optional,
        })
      }

      case Kind.Optional: {
        const { type } = json as OptionalTypeParser.Json

        return new OptionalTypeParser({ type: generateFromJson(type) })
      }

      case Kind.Predicate: {
        const { asserts, name, type } = json as PredicateTypeParser.Json

        return new PredicateTypeParser({
          asserts,
          name,
          type: type ? generateFromJson(type) : null,
        })
      }

      case Kind.Query: {
        const { query } = json as QueryTypeParser.Json

        return new QueryTypeParser({
          query: generateFromJson(query) as ReferenceTypeParser,
        })
      }

      case Kind.Reference: {
        const { id, name, packageName, typeArguments } =
          json as ReferenceTypeParser.Json

        return new ReferenceTypeParser({
          id,
          name,
          packageName: packageName ?? null,
          typeArguments: typeArguments.map((type) => generateFromJson(type)),
        })
      }

      case Kind.Reflection: {
        const { properties, signatures, methods } =
          json as ReflectionTypeParser.Json

        return new ReflectionTypeParser({
          properties:
            properties?.map((property) =>
              PropertyParser.generateFromJson(property)
            ) ?? null,
          signatures:
            signatures?.map((signature) =>
              SignatureParser.generateFromJson(signature)
            ) ?? null,
          methods:
            methods?.map((method) => MethodParser.generateFromJson(method)) ??
            null,
        })
      }

      case Kind.Rest: {
        const { type } = json as RestTypeParser.Json

        return new RestTypeParser({ type: generateFromJson(type) })
      }

      case Kind.TemplateLiteral: {
        const { head, tail } = json as TemplateLiteralTypeParser.Json

        return new TemplateLiteralTypeParser({
          head,
          tail: tail.map((tail) => ({
            type: generateFromJson(tail.type),
            text: tail.text,
          })),
        })
      }

      case Kind.Tuple: {
        const { types } = json as TupleTypeParser.Json

        return new TupleTypeParser({
          types: types.map((type) => generateFromJson(type)),
        })
      }

      case Kind.TypeOperator: {
        const { operator, type } = json as TypeOperatorTypeParser.Json

        return new TypeOperatorTypeParser({
          operator,
          type: generateFromJson(type),
        })
      }

      case Kind.Union: {
        const { types } = json as UnionTypeParser.Json

        return new UnionTypeParser({
          types: types.map((type) => generateFromJson(type)),
        })
      }

      case Kind.Unknown: {
        const { name } = json as UnknownTypeParser.Json

        return new UnknownTypeParser({ name })
      }
    }
  }

  /**
   * Wraps the given type parser depending on it's binding power.
   * @since 1.0.0
   * @param type The type parser to wrap.
   * @param binding The binding power of the type parser.
   * @returns The wrapped type parser.
   */
  export function wrap(
    type: TypeParser,
    binding: number,
    project?: ProjectParser
  ) {
    return BindingPowers[type.kind] < binding
      ? `(${type.toString(project)})`
      : type.toString(project)
  }

  /**
   * The kind of type parser.
   * @since 1.0.0
   */
  export enum Kind {
    Array = 'array',

    Conditional = 'conditional',

    IndexedAccess = 'indexedAccess',

    Inferred = 'inferred',

    Intersection = 'intersection',

    Intrinsic = 'intrinsic',

    Literal = 'literal',

    Mapped = 'mapped',

    NamedTupleMember = 'namedTupleMember',

    Optional = 'optional',

    Predicate = 'predicate',

    Query = 'query',

    Reference = 'reference',

    Reflection = 'reflection',

    Rest = 'rest',

    TemplateLiteral = 'templateLiteral',

    Tuple = 'tuple',

    TypeOperator = 'typeOperator',

    Union = 'union',

    Unknown = 'unknown',
  }

  /**
   * The binding powers of the type parsers.
   * @since 1.0.0
   */
  export const BindingPowers: Record<Kind, number> = {
    [Kind.Array]: 999,
    [Kind.Conditional]: 150,
    [Kind.IndexedAccess]: 999,
    [Kind.Inferred]: 999,
    [Kind.Intersection]: 120,
    [Kind.Intrinsic]: 999,
    [Kind.Literal]: 999,
    [Kind.Mapped]: 999,
    [Kind.NamedTupleMember]: 999,
    [Kind.Optional]: 999,
    [Kind.Predicate]: 999,
    [Kind.Query]: 900,
    [Kind.Reference]: 999,
    [Kind.Reflection]: 999,
    [Kind.Rest]: 999,
    [Kind.TemplateLiteral]: 999,
    [Kind.Tuple]: 999,
    [Kind.TypeOperator]: 900,
    [Kind.Union]: 100,
    [Kind.Unknown]: -1,
  }

  /**
   * The base interface for the json compatible format of type parsers.
   * @since 1.0.0
   */
  export interface Json {
    /**
     * The kind of type parser this is.
     * @since 1.0.0
     */
    kind: Kind
  }

  /**
   * The options for the static `*TypeParser.formatToString()` methods.
   * @since 7.0.0
   */
  export interface FormatToStringOptions<P extends TypeParser> {
    /**
     * The type parser to format.
     * @since 7.0.0
     */
    parser: P

    /**
     * The project this type parser belongs to.
     * @since 7.0.0
     */
    project?: ProjectParser
  }
}
