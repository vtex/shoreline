export function isStricTrue<T extends boolean = boolean>(
  value: any
): value is T {
  return typeof value === 'boolean' && value
}
