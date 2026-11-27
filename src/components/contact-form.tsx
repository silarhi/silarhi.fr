'use client'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import Input from '@/components/forms/input'
import Textarea from '@/components/forms/textarea'
import Button from '@/components/ui/button'
import { Envelope, FileText, Person, Phone, Spinner } from '@/components/ui/icons'
import { COMPANY_INFO } from '@/lib/schemas'
import { track } from '@/utils/analytics'

interface ContactFormData {
    name: string
    email: string
    phone: string
    message: string
}

interface FormspreeValidationError {
    code: string
    field: string
    message: string
}

interface FormspreeErrorResponse {
    error: string
    errors?: FormspreeValidationError[]
}

export default function ContactForm() {
    const [pending, setPending] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [submitError, setSubmitError] = useState<boolean>(false)

    const { register, handleSubmit, reset, formState, getFieldState, setError } = useForm<ContactFormData>()
    const errorRef = useRef<HTMLDivElement>(null)

    // The error shows above the form: bring it into view, the submit button may be the only thing on screen
    useEffect(() => {
        if (submitError) {
            errorRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        }
    }, [submitError])

    const onSubmit = useCallback(
        async (data: ContactFormData) => {
            setPending(true)
            setSubmitError(false)

            try {
                const response = await fetch('https://formspree.io/f/maykddyv', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })

                if (!response.ok) {
                    if (response.status === 422) {
                        const errorResponse: FormspreeErrorResponse = await response.json()
                        if (errorResponse.errors) {
                            for (const validationError of errorResponse.errors) {
                                const fieldName = validationError.field as keyof ContactFormData
                                if (fieldName in data) {
                                    setError(fieldName, {
                                        type: 'server',
                                        message: validationError.message,
                                    })
                                }
                            }
                            return
                        }
                    }
                    throw new Error('Response error')
                }

                reset()
                setSuccess(true)
                track('contact-form')
            } catch (_) {
                setSuccess(false)
                setSubmitError(true)
            } finally {
                setPending(false)
            }
        },
        [reset, setError]
    )

    if (success) {
        return (
            <div
                className="text-success border-success/20 bg-success/10 dark:bg-success/20 mb-0 rounded border p-4"
                role="alert"
            >
                <h4 className="mb-2 font-bold">Merci !</h4>
                <p className="mb-0">Votre message a bien été envoyé, je vous répondrai dans les plus brefs délais.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {submitError && (
                <div
                    ref={errorRef}
                    className="border-error/20 bg-error/10 dark:bg-error/20 text-error mb-4 rounded border p-4"
                    role="alert"
                >
                    <p className="mb-1 font-bold">Votre message n&apos;a pas pu être envoyé.</p>
                    <p className="mb-0">
                        Réessayez dans un instant, ou écrivez-nous directement à{' '}
                        <a href={`mailto:${COMPANY_INFO.email}`} className="text-inherit underline">
                            {COMPANY_INFO.email}
                        </a>{' '}
                        ou appelez le{' '}
                        <a href={`tel:${COMPANY_INFO.telephone}`} className="text-inherit underline">
                            {COMPANY_INFO.telephoneDisplay}
                        </a>
                        .
                    </p>
                </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="col-span-1">
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        label="Nom"
                        placeholder="Jean Dupont"
                        disabled={pending}
                        iconPrepend={<Person />}
                        formState={formState}
                        getFieldState={getFieldState}
                        register={register}
                        registerOptions={{
                            required: 'Merci de renseigner votre nom',
                            maxLength: {
                                value: 40,
                                message: 'Votre nom doit contenir maximum 40 caractères',
                            },
                        }}
                    />
                </div>
                <div className="col-span-1">
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        label="Email"
                        placeholder="nom@exemple.fr"
                        disabled={pending}
                        iconPrepend={<Envelope />}
                        formState={formState}
                        getFieldState={getFieldState}
                        register={register}
                        registerOptions={{
                            required: 'Merci de renseigner votre email',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Merci de saisir une adresse email valide (ex: nom@exemple.fr)',
                            },
                        }}
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        label={
                            <>
                                Téléphone <span className="text-foreground/60 font-normal">(facultatif)</span>
                            </>
                        }
                        placeholder="06 12 34 56 78"
                        disabled={pending}
                        iconPrepend={<Phone />}
                        formState={formState}
                        getFieldState={getFieldState}
                        register={register}
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <Textarea
                        id="message"
                        name="message"
                        rows={7}
                        label="Message"
                        placeholder="Parlez-nous de votre projet"
                        disabled={pending}
                        iconPrepend={<FileText />}
                        formState={formState}
                        getFieldState={getFieldState}
                        register={register}
                        registerOptions={{
                            required: 'Merci de rédiger votre message',
                        }}
                    />
                </div>
            </div>

            <Button variant="primary" type="submit" size="lg" className="mt-4 w-full" disabled={pending}>
                {pending ? (
                    <>
                        <Spinner className="size-5 animate-spin" />
                        Envoi en cours…
                    </>
                ) : (
                    'Envoyer'
                )}
            </Button>
            <p className="text-foreground/70 mt-3 mb-0 text-sm">
                Vos données servent uniquement à répondre à votre demande et sont transmises via Formspree.{' '}
                <Link href="/politique-de-confidentialite">En savoir plus</Link>
            </p>
        </form>
    )
}
