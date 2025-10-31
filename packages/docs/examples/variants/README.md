# Component Variants

Esta pasta contém exemplos organizados de variantes de componentes do Shoreline.

## Estrutura

```
variants/
├── button/
│   ├── primary.tsx
│   ├── secondary.tsx
│   ├── tertiary.tsx
│   ├── critical.tsx
│   └── critical-tertiary.tsx
├── alert/
│   ├── informational.tsx
│   ├── success.tsx
│   ├── critical.tsx
│   └── warning.tsx
└── toast/
    ├── informational.tsx
    ├── success.tsx
    ├── critical.tsx
    ├── warning.tsx
    └── loading.tsx
```

## Como Adicionar Novas Variantes

1. **Crie uma pasta para o componente** (se ainda não existir):
   ```bash
   mkdir -p packages/docs/examples/variants/[component-name]
   ```

2. **Crie um arquivo para cada variante**:
   ```bash
   touch packages/docs/examples/variants/[component-name]/[variant-name].tsx
   ```

3. **Siga o padrão de código**:
   ```tsx
   import { ComponentName } from '@vtex/shoreline'

   export default function Example() {
     return <ComponentName variant="variant-name">Content</ComponentName>
   }
   ```

## Benefícios desta Organização

- ✅ **Separação clara**: Cada variante em seu próprio arquivo
- ✅ **Fácil navegação**: Estrutura de pastas intuitiva
- ✅ **Reutilizável**: Pode ser importado em documentação ou testes
- ✅ **Escalável**: Fácil adicionar novos componentes e variantes
- ✅ **Manutenível**: Mudanças isoladas por variante

## Componentes Disponíveis

- **Button**: primary, secondary, tertiary, critical, criticalTertiary
- **Alert**: informational, success, critical, warning
- **Toast**: informational, success, critical, warning, loading

