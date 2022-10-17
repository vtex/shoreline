import type { RegisterOptions, UseFormReturn } from 'react-hook-form'
import { useForm as useFormState, useFieldArray } from 'react-hook-form'

export type { RegisterOptions }
export { useFormState, useFieldArray }

export type FormState = UseFormReturn<any>
