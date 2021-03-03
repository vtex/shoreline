export function renameKeys(
  keysMap: { [x: string]: any },
  obj: { [x: string]: any }
) {
  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: obj[key] },
    }),
    {}
  )
}
