// import React from 'react'

// import { BaseFilter } from '../filter-base'
// import { ComboboxItem } from '../../combobox/combobox-item'
// import { FilterSeachbox } from '../filter-searchbox'
// import { Box, Checkbox } from '../..'
// import { useMessageFormatter } from '../../i18n'
// import { messages } from '../filter.i18n'
// import type { FilterMultipleProps } from '..'

// import * as style from '../filter.style'
// import { FilterDisclosure } from '../filter-disclosure'

// export function FilterMultipleSearch<T>(props: FilterMultipleProps<T>) {
//   const formatMessage = useMessageFormatter(messages.searchBox)
//   const {
//     state: {
//       appliedItems,
//       combobox,
//       baseId,
//       getOptionId,
//       getOptionLabel,
//       label: disclosureLabel,
//     },
//     state,
//   } = props

//   const isEmpty = !combobox.matches.length

//   return (
//     <>
//       <FilterDisclosure state={state} appliedItems={appliedItems}>
//         {disclosureLabel}
//       </FilterDisclosure>
//       <BaseFilter state={state}>
//         <FilterSeachbox state={combobox} id={`${baseId ?? ''}-search`} />
//         {isEmpty && <Box>{formatMessage('noResultsTitle')}</Box>}
//         {combobox.matches.map((item) => (
//           <ComboboxItem
//             aria-selected={combobox.isSelected(item)}
//             key={getOptionId(item)}
//             onClick={() => combobox.onChange(item)}
//             style={style.option}
//             id={`${baseId ?? ''}-item-${getOptionId(item)}`}
//           >
//             <Checkbox
//               checked={combobox.isSelected(item)}
//               aria-checked={undefined}
//               label={getOptionLabel(item)}
//               readOnly
//             />
//           </ComboboxItem>
//         ))}
//       </BaseFilter>
//     </>
//   )
// }
