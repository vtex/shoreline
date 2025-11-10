import {
  DateField,
  DatePicker,
  DateRangePicker,
  Calendar,
  RangeCalendar,
  Stack,
  Text,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Date Field</Text>
      <DateField />

      <Text variant="emphasis">Date Picker</Text>
      <DatePicker />

      <Text variant="emphasis">Date Range Picker</Text>
      <DateRangePicker />

      <Text variant="emphasis">Calendar</Text>
      <Calendar />

      <Text variant="emphasis">Range Calendar</Text>
      <RangeCalendar />
    </Stack>
  )
}
