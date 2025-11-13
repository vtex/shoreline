import { Textarea } from '@vtex/shoreline'

export function DefaultTextarea() {
  return <Textarea placeholder="Default textarea" />
}

export function ResizableTextarea() {
  return <Textarea resizable placeholder="Resizable textarea" />
}

export function NonResizableTextarea() {
  return <Textarea resizable={false} placeholder="Non-resizable textarea" />
}

export function DisabledTextarea() {
  return <Textarea disabled placeholder="Disabled textarea" />
}

export function ErrorTextarea() {
  return <Textarea error placeholder="Error textarea" />
}

export function TextareaWithMaxLength() {
  return (
    <Textarea maxLength={120} placeholder="Textarea with max length of 120" />
  )
}
