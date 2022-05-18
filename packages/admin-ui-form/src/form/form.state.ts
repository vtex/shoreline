import type { RegisterOptions } from 'react-hook-form'
import { useForm as useFormState } from 'react-hook-form'

export type { RegisterOptions }
export { useFormState }

export type FormState = ReturnType<typeof useFormState>
