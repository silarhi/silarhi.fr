import { forwardRef } from 'react'
import { FieldValues } from 'react-hook-form'

import { FormFieldProps } from '@/types/forms'
import { cn } from '@/utils/lib'

import FormField from './form-field'

type InputFieldProps<TFieldValues extends FieldValues = FieldValues> = FormFieldProps<TFieldValues> &
    React.InputHTMLAttributes<HTMLInputElement>

const BaseInputWidget = forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement> & { isValid?: boolean; isInvalid?: boolean }
>(({ isValid, isInvalid, className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={cn(
                'w-full rounded-lg border px-4 py-3 text-base transition-all duration-200 ease-in-out',
                'placeholder:text-gray-400',
                'focus:ring-4 focus:outline-none',
                'hover:border-gray-400',
                'bg-white shadow-sm',
                {
                    'focus:border-primary focus:ring-primary/20 border-gray-300': !isValid && !isInvalid,
                    'border-success focus:border-success focus:ring-success/20 bg-success/5': isValid,
                    'border-error focus:border-error focus:ring-error/20 bg-error/5': isInvalid,
                },
                className
            )}
            {...props}
        />
    )
})

BaseInputWidget.displayName = 'BaseInputWidget'

function Input<TFieldValues extends FieldValues = FieldValues>(
    {
        label,
        groupClassName,
        id,
        iconPrepend,
        iconAppend,
        name,
        formState,
        getFieldState,
        register,
        registerOptions,
        ...props
    }: InputFieldProps<TFieldValues>,
    ref: React.Ref<HTMLInputElement>
) {
    return (
        <FormField
            label={label}
            groupClassName={groupClassName}
            id={id}
            iconPrepend={iconPrepend}
            iconAppend={iconAppend}
            name={name}
            register={register}
            registerOptions={registerOptions}
            formState={formState}
            getFieldState={getFieldState}
        >
            {({ isValid, isInvalid, registerProps }) => (
                <BaseInputWidget ref={ref} isValid={isValid} isInvalid={isInvalid} {...registerProps} {...props} />
            )}
        </FormField>
    )
}

export default forwardRef(Input) as <TFieldValues extends FieldValues = FieldValues>(
    props: InputFieldProps<TFieldValues> & { ref?: React.Ref<HTMLInputElement> }
) => React.ReactElement
