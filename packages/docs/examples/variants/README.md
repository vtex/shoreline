# Component Variants

This folder contains organized examples of Shoreline component variants.

## Structure

```
variants/
├── alert_variants.tsx
├── button_variants.tsx
├── checkbox_variants.tsx
├── collectionview_variants.tsx
├── datepicker_variants.tsx
├── divider_variants.tsx
├── drawer_variants.tsx
├── emptystate_variants.tsx
├── heading_variants.tsx
├── iconbutton_variants.tsx
├── input_variants.tsx
├── link_variants.tsx
├── menu_variants.tsx
├── modal_variants.tsx
├── pagination_variants.tsx
├── search_variants.tsx
├── select_variants.tsx
├── skeleton_variants.tsx
├── tag_variants.tsx
├── text_variants.tsx
├── textarea_variants.tsx
├── timeinput_variants.tsx
├── toast_variants.tsx
└── tooltip_variants.tsx
```

Each file contains multiple named exports, one for each variant or state of the component.

## Available Components and Exports

### Alert Variants (`alert_variants.tsx`)
- `InformationalAlert` - Informational alert variant
- `SuccessAlert` - Success alert variant
- `CriticalAlert` - Critical alert variant
- `WarningAlert` - Warning alert variant

### Button Variants (`button_variants.tsx`)
**Variant prop:**
- `PrimaryButton` - Primary button variant
- `SecondaryButton` - Secondary button variant
- `TertiaryButton` - Tertiary button variant
- `CriticalButton` - Critical button variant
- `CriticalTertiaryButton` - Critical tertiary button variant

**Size prop:**
- `NormalSizeButton` - Normal size button
- `LargeSizeButton` - Large size button

### Checkbox Variants (`checkbox_variants.tsx`)
- `DefaultCheckbox` - Default checkbox
- `CheckedCheckbox` - Checked checkbox
- `DisabledCheckbox` - Disabled checkbox
- `IndeterminateCheckbox` - Indeterminate checkbox
- `CheckedDisabledCheckbox` - Checked and disabled checkbox
- `IndeterminateDisabledCheckbox` - Indeterminate and disabled checkbox

### CollectionView Variants (`collectionview_variants.tsx`)
- `LoadingCollectionView` - Loading status
- `ReadyCollectionView` - Ready status with items
- `ErrorCollectionView` - Error status
- `EmptyCollectionView` - Empty status
- `NotFoundCollectionView` - Not found status
- `UnauthorizedCollectionView` - Unauthorized status

### DatePicker Variants (`datepicker_variants.tsx`)
- `DefaultDatePicker` - Default date picker
- `DisabledDatePicker` - Disabled date picker
- `ReadOnlyDatePicker` - Read-only date picker

### Divider Variants (`divider_variants.tsx`)
- `HorizontalDivider` - Horizontal orientation
- `VerticalDivider` - Vertical orientation

### Drawer Variants (`drawer_variants.tsx`)
- `SmallDrawer` - Small drawer size
- `MediumDrawer` - Medium drawer size

### EmptyState Variants (`emptystate_variants.tsx`)
- `SmallEmptyState` - Small empty state size
- `MediumEmptyState` - Medium empty state size
- `LargeEmptyState` - Large empty state size

### Heading Variants (`heading_variants.tsx`)
- `Display1Heading` - Display1 heading variant
- `Display2Heading` - Display2 heading variant
- `Display3Heading` - Display3 heading variant
- `Display4Heading` - Display4 heading variant
- `ContextHeading` - Context heading variant

### IconButton Variants (`iconbutton_variants.tsx`)
- `PrimaryIconButton` - Primary icon button variant
- `SecondaryIconButton` - Secondary icon button variant
- `TertiaryIconButton` - Tertiary icon button variant
- `CriticalIconButton` - Critical icon button variant
- `CriticalTertiaryIconButton` - Critical tertiary icon button variant

### Input Variants (`input_variants.tsx`)
- `DefaultInput` - Default input
- `InputWithPrefix` - Input with prefix
- `InputWithSuffix` - Input with suffix
- `InputWithPrefixAndSuffix` - Input with both prefix and suffix
- `DisabledInput` - Disabled input
- `ErrorInput` - Input with error state

### Link Variants (`link_variants.tsx`)
- `DefaultLink` - Default link
- `ExternalLink` - External link with target="_blank"
- `LinkWithTitle` - Link with title attribute

### Menu Variants (`menu_variants.tsx`)
- `PrimaryMenu` - Primary menu variant
- `SecondaryMenu` - Secondary menu variant
- `TertiaryMenu` - Tertiary menu variant

### Modal Variants (`modal_variants.tsx`)
- `SmallModal` - Small modal size
- `MediumModal` - Medium modal size
- `LargeModal` - Large modal size

### Pagination Variants (`pagination_variants.tsx`)
- `DefaultPagination` - Default pagination
- `LoadingPagination` - Loading state pagination
- `SmallPageSizePagination` - Pagination with small page size (10)
- `LargePageSizePagination` - Pagination with large page size (50)

### Search Variants (`search_variants.tsx`)
- `DefaultSearch` - Default search
- `DisabledSearch` - Disabled search
- `LoadingSearch` - Loading search state

### Select Variants (`select_variants.tsx`)
- `DefaultSelect` - Default select
- `DisabledSelect` - Disabled select
- `SelectWithDefaultValue` - Select with default value

### Skeleton Variants (`skeleton_variants.tsx`)
- `CircleSkeleton` - Circle shape
- `RectSkeleton` - Rectangle shape

### Tag Variants (`tag_variants.tsx`)
**Variant prop:**
- `PrimaryTag` - Primary tag variant
- `SecondaryTag` - Secondary tag variant

**Color prop:**
- `GrayTag` - Gray color tag
- `RedTag` - Red color tag
- `TealTag` - Teal color tag
- `PurpleTag` - Purple color tag
- `PinkTag` - Pink color tag
- `GreenTag` - Green color tag
- `CyanTag` - Cyan color tag
- `BlueTag` - Blue color tag
- `OrangeTag` - Orange color tag
- `YellowTag` - Yellow color tag

**Size prop:**
- `NormalSizeTag` - Normal size tag
- `LargeSizeTag` - Large size tag

### Text Variants (`text_variants.tsx`)
- `ContextText` - Context text variant
- `BodyText` - Body text variant
- `ActionText` - Action text variant
- `EmphasisText` - Emphasis text variant
- `Caption1Text` - Caption1 text variant
- `Caption2Text` - Caption2 text variant
- `Display1Text` - Display1 text variant
- `Display2Text` - Display2 text variant
- `Display3Text` - Display3 text variant
- `Display4Text` - Display4 text variant

### Textarea Variants (`textarea_variants.tsx`)
- `DefaultTextarea` - Default textarea
- `ResizableTextarea` - Resizable textarea
- `NonResizableTextarea` - Non-resizable textarea
- `DisabledTextarea` - Disabled textarea
- `ErrorTextarea` - Textarea with error state
- `TextareaWithMaxLength` - Textarea with max length

### TimeInput Variants (`timeinput_variants.tsx`)
- `DefaultTimeInput` - Default time input
- `DisabledTimeInput` - Disabled time input
- `ReadOnlyTimeInput` - Read-only time input

### Toast Variants (`toast_variants.tsx`)
- `InformationalToast` - Informational toast variant
- `SuccessToast` - Success toast variant
- `CriticalToast` - Critical toast variant
- `WarningToast` - Warning toast variant
- `LoadingToast` - Loading toast variant

### Tooltip Variants (`tooltip_variants.tsx`)
- `DefaultTooltip` - Default tooltip
- `TooltipWithIconButton` - Tooltip with icon button
- `TooltipTop` - Tooltip positioned on top
- `TooltipBottom` - Tooltip positioned on bottom
- `TooltipLeft` - Tooltip positioned on left
- `TooltipRight` - Tooltip positioned on right

## How to Use

Import the specific variant you need:

```tsx
import { PrimaryButton, LargeSizeButton } from './variants/button_variants'
import { SuccessAlert } from './variants/alert_variants'
import { DefaultCheckbox, IndeterminateCheckbox } from './variants/checkbox_variants'
import { InputWithPrefix, ErrorInput } from './variants/input_variants'
import { ResizableTextarea } from './variants/textarea_variants'
import { DefaultSearch, LoadingSearch } from './variants/search_variants'
import { DefaultSelect } from './variants/select_variants'
import { DefaultDatePicker } from './variants/datepicker_variants'
import { DefaultTimeInput } from './variants/timeinput_variants'
import { TooltipTop } from './variants/tooltip_variants'
import { ExternalLink } from './variants/link_variants'
import { DefaultPagination } from './variants/pagination_variants'
```

## How to Add New Variants

1. **Open the appropriate component file** (e.g., `button_variants.tsx`)

2. **Add a new named export function**:
   ```tsx
   export function NewVariantButton() {
     return <Button variant="newVariant">New Variant Button</Button>
   }
   ```

3. **Update this README** with the new variant in the appropriate section

## Benefits of This Organization

- ✅ **Centralized**: All variants for a component in one file
- ✅ **Modular**: Import only the variants you need
- ✅ **Type-safe**: Each export is a properly typed React component
- ✅ **Reusable**: Can be imported in documentation, tests, or other examples
- ✅ **Maintainable**: Easy to see all variants at a glance
- ✅ **Consistent naming**: Clear convention with `ComponentVariant` pattern
- ✅ **Complete coverage**: Covers all visual variations and common states
- ✅ **Comprehensive**: 24 components with 100+ variants total
