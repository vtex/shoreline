import { LocaleProvider, Select, SelectItem } from '@vtex/shoreline'

export default function Example() {
  return (
    <LocaleProvider locale="ja-JP">
      <Select>
        <SelectItem value="りんご">りんご</SelectItem>
        <SelectItem value="バナナ">バナナ</SelectItem>
        <SelectItem value="葡萄">葡萄</SelectItem>
      </Select>
    </LocaleProvider>
  )
}
