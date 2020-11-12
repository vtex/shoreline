# Brand Calendar

A `Calendar` is a container that displays date data in a form, which allows the user to select a specific date.

# Detailed design

| prop     | type      | description                 | required | default |
| -------- | --------- | --------------------------- | -------- | -------- |
| onChange | function | the function that handles changes on the date selected | 🚫       | - |
| day | number | the day that will be displayed | 🚫       | current day |
| month | number | the month that will be displayed | 🚫       | current month |
| year | number | the year that will be displayed | 🚫       | current year |
| events | Events | events that should have a mark on the calendar | 🚫       | [] |
| locale | string | internationalization of the dates and weekdays | 🚫       | `en` |
| disabled | boolean | whether the calendar is disabled or not | 🚫       | `false` |

The `Events` type is specified below:

```ts
type Events = Record<string, {
  name: string
  colors: string[]
}>
```

Where `name` is the name of the event and `colors` correspond to the colors that the mark should have when displayed. The keys of the **events** object should be dates in `YYYY-MM-DD` format.

## Usage

### Basic usage

```jsx
import { Calendar } from '@vtex/brand-ui'

const [date, setDate] = useState<Date>()

function onChange(value) {
  setDate(value)
}

<Calendar onChange={onChange} month={9} day={27} year={2020} />
```

### Usage with events

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
