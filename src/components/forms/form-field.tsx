import { type ReactNode, useId } from 'react'
import type { FieldValues } from 'react-hook-form'

import { useFormFieldProps } from '@/hooks/form'
import type { FormFieldProps } from '@/types/forms'

import Group from './group'
import InputIcon from './input-icon'

interface FormFieldWrapperProps<TFieldValues extends FieldValues = FieldValues> extends FormFieldProps<TFieldValues> {
    children: (props: { isValid: boolean; isInvalid: boolean; registerProps: Record<string, unknown> }) => ReactNode
}

export default function FormField<TFieldValues extends FieldValues = FieldValues>({
    label,
    groupClassName,
    id,
    iconPrepend,
    iconAppend,
    name,
    register,
    registerOptions,
    formState,
    getFieldState,
    children,
}: FormFieldWrapperProps<TFieldValues>) {
    const { isValid, isInvalid, error, registerProps } = useFormFieldProps({
        name,
        register,
        registerOptions,
        formState,
        getFieldState,
    })

    // The widget carries the id the label points to (a generated one when none is given), and its error message
    const generatedId = useId()
    const fieldId = id ?? generatedId
    const errorId = `${fieldId}-error`
    const widget = children({
        isValid,
        isInvalid,
        registerProps: {
            ...registerProps,
            id: fieldId,
            'aria-invalid': isInvalid || undefined,
            'aria-describedby': error ? errorId : undefined,
        },
    })

    return (
        <Group
            label={label}
            error={error}
            groupClassName={groupClassName}
            id={fieldId}
            errorId={errorId}
            isInvalid={isInvalid}
            isValid={isValid}
        >
            {iconPrepend || iconAppend ? (
                <InputIcon iconPrepend={iconPrepend} iconAppend={iconAppend}>
                    {widget}
                </InputIcon>
            ) : (
                widget
            )}
        </Group>
    )
}
