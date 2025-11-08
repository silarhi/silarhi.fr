import { forwardRef } from 'react'
import { FieldValues } from 'react-hook-form'

import { FormFieldProps } from '@/types/forms'
import { cn } from '@/utils/lib'

import FormField from './form-field'

type TextareaFieldProps<TFieldValues extends FieldValues = FieldValues> = FormFieldProps<TFieldValues> &
    React.TextareaHTMLAttributes<HTMLTextAreaElement>

const BaseTextareaWidget = forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> & { isValid?: boolean; isInvalid?: boolean }
>(({ isValid, isInvalid, className, ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={cn(
                'w-full rounded-lg border px-4 py-3 text-base transition-all duration-200 ease-in-out',
                'placeholder:text-gray-400',
                'focus:ring-4 focus:outline-none',
                'hover:border-gray-400',
                'bg-surface resize-none shadow-sm',
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

BaseTextareaWidget.displayName = 'BaseTextareaWidget'

function Textarea<TFieldValues extends FieldValues = FieldValues>(
    {
        label,
        groupClassName,
        id,
        iconPrepend,
        iconAppend,
        name,
        formState,
        register,
        registerOptions,
        getFieldState,
        ...props
    }: TextareaFieldProps<TFieldValues>,
    ref: React.Ref<HTMLTextAreaElement>
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
                <BaseTextareaWidget ref={ref} isValid={isValid} isInvalid={isInvalid} {...registerProps} {...props} />
            )}
        </FormField>
    )
}

export default forwardRef(Textarea) as <TFieldValues extends FieldValues = FieldValues>(
    props: TextareaFieldProps<TFieldValues> & { ref?: React.Ref<HTMLTextAreaElement> }
) => React.ReactElement
