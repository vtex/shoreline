import {
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopover,
  ComboboxProvider,
} from '@vtex/shoreline'

export function DefaultCombobox() {
  return (
    <ComboboxProvider>
      <ComboboxInput placeholder="Select a fruit" />
      <ComboboxPopover>
        <ComboboxItem value="Apple">Apple</ComboboxItem>
        <ComboboxItem value="Banana">Banana</ComboboxItem>
        <ComboboxItem value="Cherry">Cherry</ComboboxItem>
        <ComboboxItem value="Grape">Grape</ComboboxItem>
        <ComboboxItem value="Orange">Orange</ComboboxItem>
      </ComboboxPopover>
    </ComboboxProvider>
  )
}

export function ComboboxWithList() {
  return (
    <ComboboxProvider>
      <ComboboxInput placeholder="Search items" />
      <ComboboxPopover>
        <ComboboxList>
          <ComboboxItem value="Item 1">Item 1</ComboboxItem>
          <ComboboxItem value="Item 2">Item 2</ComboboxItem>
          <ComboboxItem value="Item 3">Item 3</ComboboxItem>
        </ComboboxList>
      </ComboboxPopover>
    </ComboboxProvider>
  )
}

export function ComboboxWithAutoSelect() {
  return (
    <ComboboxProvider>
      <ComboboxInput autoSelect placeholder="Auto-selects first match" />
      <ComboboxPopover>
        <ComboboxItem value="Apple">Apple</ComboboxItem>
        <ComboboxItem value="Avocado">Avocado</ComboboxItem>
        <ComboboxItem value="Banana">Banana</ComboboxItem>
      </ComboboxPopover>
    </ComboboxProvider>
  )
}

export function DisabledCombobox() {
  return (
    <ComboboxProvider>
      <ComboboxInput disabled placeholder="Disabled combobox" />
      <ComboboxPopover>
        <ComboboxItem value="Apple">Apple</ComboboxItem>
      </ComboboxPopover>
    </ComboboxProvider>
  )
}
