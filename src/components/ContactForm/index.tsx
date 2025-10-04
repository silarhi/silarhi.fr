import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import Group from '@/components/Form/Group'
import Help from '@/components/Form/Help'
import Input from '@/components/Form/Input'
import Textarea from '@/components/Form/Textarea'
import { Enveloppe, Person, Phone } from '@/components/Icons'

interface ContactFormData {
    name: string
    email: string
    phone: string
    message: string
}

interface ContactFormProps {
    isSubmitted?: boolean
    onFinish?: (data: ContactFormData) => void
    onPending?: () => void
}

export default function ContactForm({ isSubmitted = false, onFinish, onPending }: ContactFormProps) {
    const [pending, setPending] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { touchedFields, errors },
    } = useForm<ContactFormData>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
    })

    const onSubmit = useCallback(
        async (data: ContactFormData) => {
            setPending(true)
            if (onPending) {
                onPending()
            }

            setPending(false)
            if (onFinish) {
                onFinish(data)
            }

            return axios({
                method: 'POST',
                url: 'https://formspree.io/f/maykddyv',
                data,
            })
                .then(() => {
                    setPending(false)
                    setSuccess(true)
                    setError(false)
                    reset()
                    if (onFinish) {
                        onFinish(data)
                    }
                })
                .catch(() => {
                    setPending(false)
                    setSuccess(false)
                    setError(true)
                })
        },
        [reset, onFinish, onPending]
    )

    useEffect(() => {
        if (isSubmitted) {
            handleSubmit(onSubmit)()
        }
    }, [isSubmitted, handleSubmit, onSubmit])

    const isFilled = (fieldName: keyof ContactFormData): boolean => !!touchedFields[fieldName]
    const isValid = (fieldName: keyof ContactFormData): boolean => isFilled(fieldName) && !errors[fieldName]
    const isInvalid = (fieldName: keyof ContactFormData): boolean => !!errors[fieldName]

    if (success) {
        return (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded mb-0" role="alert">
                <h4 className="font-bold mb-2">Merci !</h4>
                <p>Votre message a bien été envoyé, je vous répondrai dans les plus brefs délais.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
                    Une erreur est survenue pendant l{"'"}envoi du formulaire.
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    <Group valid={isValid('name')}>
                        <Input
                            id="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Nom"
                            disabled={pending}
                            iconPrepend={<Person />}
                            isValid={isValid('name')}
                            isInvalid={isInvalid('name')}
                            {...register('name', {
                                required: 'Veuillez fournir votre nom',
                                maxLength: {
                                    value: 40,
                                    message: 'Le nom est trop long (40 caractères max)',
                                },
                            })}
                        />
                        {isInvalid('name') && <Help type={'invalid'}>{errors.name?.message}</Help>}
                    </Group>
                </div>
                <div className="col-span-1">
                    <Group valid={isValid('email')}>
                        <Input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Email"
                            disabled={pending}
                            iconPrepend={<Enveloppe />}
                            isValid={isValid('email')}
                            isInvalid={isInvalid('email')}
                            required
                            {...register('email', {
                                required: 'Veuillez fournir votre email',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "L'email n'est pas au bon format",
                                },
                            })}
                        />
                        {isInvalid('email') && <Help type={'invalid'}>{errors.email?.message}</Help>}
                    </Group>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <Group valid={isValid('phone')}>
                        <Input
                            id="phone"
                            type="text"
                            autoComplete="tel"
                            placeholder="Téléphone"
                            disabled={pending}
                            iconPrepend={<Phone />}
                            isValid={isValid('phone')}
                            isInvalid={isInvalid('phone')}
                            required
                            {...register('phone', {
                                required: 'Veuillez fournir votre numéro de téléphone afin que je puisse vous rappeler',
                            })}
                        />
                        {isInvalid('phone') && <Help type={'invalid'}>{errors.phone?.message}</Help>}
                    </Group>
                </div>
                <div className="col-span-1 md:col-span-2">
                    <Group groupClassName={'mb-0'} valid={isValid('message')}>
                        <Textarea
                            id="message"
                            rows={7}
                            placeholder="Message"
                            disabled={pending}
                            isValid={isValid('message')}
                            isInvalid={isInvalid('message')}
                            required
                            {...register('message', {
                                required: 'Veuillez écrire votre message',
                            })}
                        />
                        {isInvalid('message') && <Help type={'invalid'}>{errors.message?.message}</Help>}
                    </Group>
                </div>
            </div>
            {/* We use hidden input submit to submit form with "Enter" keystroke */}
            <input type={'submit'} className="hidden" />
        </form>
    )
}
