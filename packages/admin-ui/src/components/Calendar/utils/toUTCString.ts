export function toUTCString(date: Date) {
  return date.toISOString().slice(0, 10)
}
