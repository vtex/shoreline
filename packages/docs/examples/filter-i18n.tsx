import { Filter, FilterItem, LocaleProvider } from '@vtex/shoreline'

export default function Example() {
  return (
    <LocaleProvider locale="pt-BR">
      <Filter label="Status">
        <FilterItem value="Stable">Estável</FilterItem>
        <FilterItem value="Experimental">Experimental</FilterItem>
        <FilterItem value="Deprecated">Deprecado</FilterItem>
      </Filter>
    </LocaleProvider>
  )
}
