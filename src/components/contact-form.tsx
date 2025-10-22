'use client'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/components/button'
import Input from '@/components/forms/input'
import Textarea from '@/components/forms/textarea'
import { Envelope, Person, Phone } from '@/components/icons'

interface ContactFormData {
    name: string
    email: string
    phone: string
    message: string
}

export default function ContactForm() {
    const [pending, setPending] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const { register, handleSubmit, reset, formState, getFieldState } = useForm<ContactFormData>()

    const onSubmit = useCallback(
        async (data: ContactFormData) => {
            setPending(true)

            try {
                const response = await fetch('https://formspree.io/f/maykddyv', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })

                if (!response.ok) {
                    throw new Error('Response error')
                }

                reset()
                setSuccess(true)
                setError(false)
            } catch (_) {
                setSuccess(false)
                setError(true)
            } finally {
                setPending(false)
            }
        },
        [reset]
    )

    if (success) {
        return (
            <div className="text-success border-success/20 bg-success/10 mb-0 rounded border p-4" role="alert">
                <h4 className="mb-2 font-bold">Merci !</h4>
                <p className="mb-0">Votre message a bien été envoyé, je vous répondrai dans les plus brefs délais.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
                <div className="border-error/20 bg-error/10 text-error mb-4 rounded border p-4" role="alert">
                    Une erreur est survenue pendant l&apos;envoi du message.
                </div>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="col-span-1">
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Nom"
                        disabled={pending}
                        iconPrepend={<Person />}
                        formState={formState}
                        getFieldState={getFieldState}
                        register={register}
                        registerOptions={{
                            required: 'Veuillez fournir votre nom',
                            maxLength: {
                                value: 40,
                                message: 'Le nom est trop long (40 caractères max)',
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
                        placeholder="Email"
                        disabled={pending}
                        iconPrepend={<Envelope />}
                        formState={formState}
                        getFieldState={getFieldState}
                        register={register}
                        registerOptions={{
                            required: 'Veuillez fournir votre email',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "L'email n'est pas au bon format",
                            },
                        }}
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <Input
                        id="phone"
                        name="phone"
                        type="text"
                        autoComplete="tel"
                        placeholder="Téléphone"
                        disabled={pending}
                        iconPrepend={<Phone />}
                        formState={formState}
                        getFieldState={getFieldState}
                        register={register}
                        registerOptions={{
                            required: 'Veuillez fournir votre numéro de téléphone afin que je puisse vous rappeler',
                        }}
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <Textarea
                        id="message"
                        name="message"
                        rows={7}
                        placeholder="Message"
                        disabled={pending}
                        formState={formState}
                        getFieldState={getFieldState}
                        register={register}
                        registerOptions={{
                            required: 'Veuillez écrire votre message',
                        }}
                    />
                </div>
            </div>

            <Button variant="primary" type="submit" size="lg" className="mt-4 w-full" disabled={pending}>
                Envoyer
            </Button>
        </form>
    )
}
