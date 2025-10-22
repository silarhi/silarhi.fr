import { ReactNode } from 'react'
import type {
    FieldPath,
    FieldValues,
    FormState,
    RegisterOptions,
    UseFormGetFieldState,
    UseFormRegister,
} from 'react-hook-form'

export interface FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    name: TFieldName
    label?: ReactNode
    groupClassName?: string
    id?: string
    iconPrepend?: ReactNode
    iconAppend?: ReactNode
    register?: UseFormRegister<TFieldValues>
    registerOptions?: RegisterOptions<TFieldValues, TFieldName>
    formState?: FormState<TFieldValues>
    getFieldState?: UseFormGetFieldState<TFieldValues>
}
