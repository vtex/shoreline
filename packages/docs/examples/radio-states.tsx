import { Radio, RadioGroup } from '@vtex/shoreline'

export default function Example() {
  return (
    <RadioGroup label="">
      <Radio value="opt1">Plain</Radio>
      <Radio value="opt2" checked>
        Checked
      </Radio>
      <Radio value="opt3" error>
        Error
      </Radio>
      <Radio value="opt4" disabled>
        Disabled
      </Radio>
      <Radio value="opt5" checked error disabled>
        All states
      </Radio>
    </RadioGroup>
  )
}
