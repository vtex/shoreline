export enum ReflectionKind {
  Project = 0x1,
  Module = 0x2,
  Namespace = 0x4,
  Enum = 0x8,
  EnumMember = 0x10,
  Variable = 0x20,
  Function = 0x40,
  Class = 0x80,
  Interface = 0x100,
  Constructor = 0x200,
  Property = 0x400,
  Method = 0x800,
  CallSignature = 0x1000,
  IndexSignature = 0x2000,
  ConstructorSignature = 0x4000,
  Parameter = 0x8000,
  TypeLiteral = 0x10000,
  TypeParameter = 0x20000,
  Accessor = 0x40000,
  GetSignature = 0x80000,
  SetSignature = 0x100000,
  TypeAlias = 0x200000,
  Reference = 0x400000,
}

export function reflectionKindToString(kind: ReflectionKind): string {
  switch (kind) {
    case ReflectionKind.Project:
      return 'Project'

    case ReflectionKind.Module:
      return 'Module'

    case ReflectionKind.Namespace:
      return 'Namespace'

    case ReflectionKind.Enum:
      return 'Enum'

    case ReflectionKind.EnumMember:
      return 'EnumMember'

    case ReflectionKind.Variable:
      return 'Variable'

    case ReflectionKind.Function:
      return 'Function'

    case ReflectionKind.Class:
      return 'Class'

    case ReflectionKind.Interface:
      return 'Interface'

    case ReflectionKind.Constructor:
      return 'Constructor'

    case ReflectionKind.Property:
      return 'Property'

    case ReflectionKind.Method:
      return 'Method'

    case ReflectionKind.CallSignature:
      return 'CallSignature'

    case ReflectionKind.IndexSignature:
      return 'IndexSignature'

    case ReflectionKind.ConstructorSignature:
      return 'ConstructorSignature'

    case ReflectionKind.Parameter:
      return 'Parameter'

    case ReflectionKind.TypeLiteral:
      return 'TypeLiteral'

    case ReflectionKind.TypeParameter:
      return 'TypeParameter'

    case ReflectionKind.Accessor:
      return 'Accessor'

    case ReflectionKind.GetSignature:
      return 'GetSignature'

    case ReflectionKind.SetSignature:
      return 'SetSignature'

    case ReflectionKind.TypeAlias:
      return 'TypeAlias'

    case ReflectionKind.Reference:
      return 'Reference'
  }
}
