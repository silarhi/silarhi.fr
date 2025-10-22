import { useMemo } from 'react'
import type {
    FieldPath,
    FieldValues,
    FormState,
    RegisterOptions,
    UseFormGetFieldState,
    UseFormRegister,
} from 'react-hook-form'

interface UseFormFieldPropsArgs<
    TFieldValues extends FieldValues = FieldValues,
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
    name: TFieldName
    register?: UseFormRegister<TFieldValues>
    registerOptions?: RegisterOptions<TFieldValues, TFieldName>
    formState?: FormState<TFieldValues>
    getFieldState?: UseFormGetFieldState<TFieldValues>
}

export function useFormFieldProps<TFieldValues extends FieldValues = FieldValues>({
    name,
    register,
    registerOptions,
    formState,
    getFieldState,
}: UseFormFieldPropsArgs<TFieldValues>) {
    const registerProps = useMemo(
        () => (register ? register(name, registerOptions) : {}),
        [register, name, registerOptions]
    )
    const fieldState = getFieldState?.(name, formState)

    return useMemo(() => {
        const error = fieldState?.error?.message
        const isInvalid = fieldState?.invalid ?? false
        const isDirty = fieldState?.isDirty ?? false
        const isTouched = fieldState?.isTouched ?? false
        // Only show as valid if field is dirty, touched, not invalid, AND has been validated successfully
        // This ensures empty fields that were cleared don't show as valid
        const isValid = !isInvalid && isDirty && isTouched && !error

        return {
            error,
            isInvalid,
            isValid,
            registerProps,
        }
    }, [fieldState?.error?.message, fieldState?.invalid, fieldState?.isDirty, fieldState?.isTouched, registerProps])
}
