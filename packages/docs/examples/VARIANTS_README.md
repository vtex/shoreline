# Component Variants

This folder contains organized examples of Shoreline component variants. Each file consolidates all variants of a specific component.

## Structure

```
variants/
├── alert-variants.tsx
├── button-variants.tsx
├── checkbox-group-variants.tsx
├── checkbox-variants.tsx
├── collection-variants.tsx
├── confirmation-modal-variants.tsx
├── content-variants.tsx
├── contextual-help-variants.tsx
├── date-variants.tsx
├── divider-variants.tsx
├── drawer-variants.tsx
├── empty-state-variants.tsx
├── field-variants.tsx
├── filter-variants.tsx
├── heading-variants.tsx
├── icon-button-variants.tsx
├── input-variants.tsx
├── link-variants.tsx
├── menu-variants.tsx
├── modal-variants.tsx
├── page-variants.tsx
├── pagination-variants.tsx
├── radio-group-variants.tsx
├── radio-variants.tsx
├── search-variants.tsx
├── select-variants.tsx
├── skeleton-variants.tsx
├── spinner-variants.tsx
├── stack-variants.tsx
├── tab-variants.tsx
├── table-variants.tsx
├── tag-variants.tsx
├── text-variants.tsx
├── textarea-variants.tsx
├── time-input-variants.tsx
├── toast-variants.tsx
├── tooltip-variants.tsx
└── README.md
```

## File Organization

Each file follows the pattern `[component-name]-variants.tsx` and contains:
- All visual variants of the component
- All size variations (if applicable)
- All color combinations (for Tag)
- Properly organized using Stack/Flex for visual grouping

## How to Add New Variants

1. **Create or update a variants file**:
   ```bash
   touch packages/docs/examples/variants/[component-name]-variants.tsx
   ```

2. **Follow the code pattern**:
   ```tsx
   import { ComponentName, Stack, Text } from '@vtex/shoreline'

   export default function Example() {
     return (
       <Stack fluid>
         <Text variant="emphasis">Variant Group</Text>
         <Stack horizontal>
           <ComponentName variant="variant1">Content</ComponentName>
           <ComponentName variant="variant2">Content</ComponentName>
         </Stack>
       </Stack>
     )
   }
   ```

## Benefits of This Organization

- ✅ **Consolidated view**: All variants of a component in one file
- ✅ **Easy comparison**: See all options side by side
- ✅ **Simple maintenance**: One file per component
- ✅ **Clear naming**: All files follow `-variants` suffix pattern
- ✅ **Reusable**: Can be imported in documentation or tests

## Available Components

| Component | Variants | Description |
|-----------|----------|-------------|
| **alert-variants** | 4 | informational, success, critical, warning |
| **button-variants** | 5 + 2 sizes | primary, secondary, tertiary, critical, criticalTertiary + normal, large |
| **checkbox-variants** | 5 states | default, checked, disabled, indeterminate, indeterminate+disabled |
| **checkbox-group-variants** | 6 variations | default, with description, horizontal, error, horizontal+error, mixed states |
| **collection-variants** | 4 status | empty, error, not-found, unauthorized |
| **confirmation-modal-variants** | 2 | standard, critical action |
| **content-variants** | 2 widths | normal, narrow |
| **contextual-help-variants** | 4 placements | bottom-start, bottom-end, top-start, top-end |
| **date-variants** | 5 components | DateField, DatePicker, DateRangePicker, Calendar, RangeCalendar |
| **divider-variants** | 2 | horizontal, vertical |
| **drawer-variants** | 2 | small, medium |
| **empty-state-variants** | 3 | small, medium, large |
| **field-variants** | 4 | normal, large, error, large+error |
| **filter-variants** | 3 examples | standard, many options, few options |
| **heading-variants** | 5 | display1, display2, display3, display4, context |
| **icon-button-variants** | 5 + 2 sizes | primary, secondary, tertiary, critical, criticalTertiary + normal, large |
| **input-variants** | 6 states | default, prefix, suffix, prefix+suffix, disabled, error |
| **link-variants** | 4 examples | standard, external, in text, multiple |
| **menu-variants** | 3 | primary, secondary, tertiary |
| **modal-variants** | 3 types | standard, without footer, long content |
| **page-variants** | 3 layouts | narrow, standard, wide |
| **pagination-variants** | 5 states | first page, middle, last, few pages, single |
| **radio-variants** | 5 states | plain, checked, error, disabled, all states |
| **radio-group-variants** | 5 variations | vertical, with description, horizontal, error, disabled options |
| **search-variants** | 4 states | default, loading, disabled, custom placeholder |
| **select-variants** | 3 examples | standard, many options, few options |
| **skeleton-variants** | 2 | rect, circle |
| **spinner-variants** | 6 sizes | default, small, medium, large, extra large, custom description |
| **stack-variants** | 3 | vertical, horizontal, fluid |
| **tab-variants** | 3 examples | standard, many tabs, few tabs |
| **table-variants** | 3 examples | standard, many columns, compact |
| **tag-variants** | 20 + 2 sizes | primary/secondary × 10 colors + normal, large |
| **text-variants** | 10 | context, body, action, emphasis, caption1, caption2, display1-4 |
| **textarea-variants** | 4 states | default, optional, resizable, error |
| **time-input-variants** | 4 states | default, with placeholder, disabled, error |
| **toast-variants** | 5 | informational, success, critical, warning, loading |
| **tooltip-variants** | 4 examples | with icon button, with button, long text, short label |

## Summary

- **37 components**
- **37 consolidated files** (one per component)
- **150+ variants** in total
- All following the `-variants` naming pattern
