# Component Variants

This folder contains organized examples of Shoreline component variants.

## Structure

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

## How to Add New Variants

1. **Create a folder for the component** (if it doesn't exist yet):
   ```bash
   mkdir -p packages/docs/examples/variants/[component-name]
   ```

2. **Create a file for each variant**:
   ```bash
   touch packages/docs/examples/variants/[component-name]/[variant-name].tsx
   ```

3. **Follow the code pattern**:
   ```tsx
   import { ComponentName } from '@vtex/shoreline'

   export default function Example() {
     return <ComponentName variant="variant-name">Content</ComponentName>
   }
   ```

## Benefits of This Organization

- ✅ **Clear separation**: Each variant in its own file
- ✅ **Easy navigation**: Intuitive folder structure
- ✅ **Reusable**: Can be imported in documentation or tests
- ✅ **Scalable**: Easy to add new components and variants
- ✅ **Maintainable**: Isolated changes per variant

## Available Components

- **Button**: primary, secondary, tertiary, critical, criticalTertiary
- **Alert**: informational, success, critical, warning
- **Toast**: informational, success, critical, warning, loading

