import { ReactNode } from 'react'
import { FieldValues } from 'react-hook-form'

import { useFormFieldProps } from '@/hooks/form'
import { FormFieldProps } from '@/types/forms'

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

    const widget = children({ isValid, isInvalid, registerProps })

    return (
        <Group
            label={label}
            error={error}
            groupClassName={groupClassName}
            id={id}
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
