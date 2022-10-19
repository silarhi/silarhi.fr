import Group from "components/Form/Group"
import Help from "components/Form/Help"
import Input from "components/Form/Input"
import Textarea from "components/Form/Textarea"
import {Enveloppe, Person, Phone} from "components/Icons/Icons"
import {useEffect} from "react"
import {useForm} from "react-hook-form"


export default function ContactForm({isSubmitted, onSuccess}) {
  const {register, handleSubmit, formState: {touchedFields, errors}} = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
  })

  useEffect(() => {
    if(isSubmitted) {
      handleSubmit(onSubmit)()
    }
  }, [isSubmitted, handleSubmit])

  const onSubmit = data => console.log(data)

  const isFilled = (fieldName) => !!touchedFields[fieldName]
  const isValid = (fieldName) => isFilled(fieldName) && !errors[fieldName]
  const isInvalid = (fieldName) => !!errors[fieldName]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={"row"}>
        <div className={"col-12 col-md-6"}>
          <Group valid={isValid('name')}>
            <Input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              size="40"
              placeholder="Nom"
              iconPrepend={<Person />}
              isValid={isValid('name')}
              isInvalid={isInvalid('name')}
              {...register('name', {
                required: 'Veuillez fournir votre nom',
                maxLength: {
                  value: 40,
                  message: 'Le nom est trop long (40 caractères max)'
                }
              })} />
            {isInvalid('name') && (<Help type={"invalid"}>{errors.name.message}</Help>)}
          </Group>
        </div>
        <div className={"col-12 col-md-6"}>
          <Group valid={isValid('email')}>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              name="email"
              placeholder="Email"
              iconPrepend={<Enveloppe />}
              isValid={isValid('email')}
              isInvalid={isInvalid('email')}
              {...register('email', {
                required: 'Veuillez fournir votre email',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "L'email n'est pas au bon format"
                }
              })} />
            {isInvalid('email') && (<Help type={"invalid"}>{errors.email.message}</Help>)}
          </Group>
        </div>
        <div className={"col-12"}>
          <Group valid={isValid('phone')}>
            <Input
              id="phone"
              type="text"
              autoComplete="tel"
              inputMode="tel"
              name="phone"
              placeholder="Téléphone"
              iconPrepend={<Phone />}
              isValid={isValid('phone')}
              isInvalid={isInvalid('phone')}
              {...register('phone', {
                required: 'Veuillez fournir votre numéro de téléphone afin que je puisse vous rappeler',
              })} />
            {isInvalid('phone') && (<Help type={"invalid"}>{errors.phone.message}</Help>)}
          </Group>
        </div>
        <div className={"col-12"}>
          <Group groupClassName={"mb-0"} valid={isValid('phone')}>
            <Textarea
              id="message"
              type="email"
              name="message"
              rows={7}
              placeholder="Message"
              isValid={isValid('message')}
              isInvalid={isInvalid('message')}
              {...register('message', {
                required: 'Veuillez écrire votre message',
              })} />
            {isInvalid('message') && (<Help type={"invalid"}>{errors.message.message}</Help>)}
          </Group>
        </div>
      </div>
      {/* We use hidden input submit to submit form with "Enter" keystroke */}
      <input type={"submit"} className={"d-none"} />
    </form>
  )
}

ContactForm.defaultProps = {
  isSubmitted: false
}
