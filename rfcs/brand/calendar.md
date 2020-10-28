# RFC Brand Calendar

- 📅 Start Date: 2020-10-27
- 🏆 Champion: @lucasmedeiros

# Summary

A `Calendar` is a container that displays date data in a form, which allows the user to select a specific date.

## Basic example

```jsx
import { Calendar } from '@vtex/brand-ui'

const [date, setDate] = useState<Date>()

function onChange(value) {
  setDate(value)
}

<Calendar onChange={onChange} month={9} day={27} year={2020} />
```

## Example with events

```jsx
import { Calendar } from '@vtex/brand-ui'

const events = {
  '2020-10-27': {
    name: 'Incident on Collections',
    colors: ['primary.base'],
  },
  '2020-10-27': {
    name: 'Incident on Checkout and Collections',
    colors: ['#FF0000', '#FFB100'],
  },
}

<Calendar events={events} />
```

# Detailed design

| prop     | type      | description                 | required | default |
| -------- | --------- | --------------------------- | -------- | -------- |
| onChange | function | the function that handles changes on the date selected | 🚫       | - |
| day | number | the day that will be displayed | 🚫       | current day |
| month | number | the month that will be displayed | 🚫       | current month |
| year | number | the year that will be displayed | 🚫       | current year |
| events | Event[] | events that should have a mark on the calendar | 🚫       | [] |

The `Event` type is specified below:

```ts
type Event = Record<string, {
  name: string
  colors: string[]
}>
```

Where `name` is the name of the event and `colors` correspond to the colors that the mark should have when displayed. The keys of the **events** object should be dates in `YYYY-MM-DD` format.

# Adoption strategy

- This is a new feature, no breaking changes to any packages in `onda`.

# Education

- Document the components with its user cases, besides usage examples with all Calendar's features (with and without events, with month and date, etc).

# Unresolved questions

- Is this a brand specific component, or a component that can be reused by all VTEX Styleguides?
