import { useCallback, useState } from 'react'

import Button, { ButtonProps } from '@/components/Button'
import ContactForm from '@/components/ContactForm'
import Modal from '@/components/Modal'
import useForceReducer from '@/hooks/reducer'

type CallToActionButtonProps = Omit<ButtonProps, 'onClick'>

function MyVerticallyCenteredModal({ onHide, show }: { onHide: () => void; show: boolean }) {
    const { value: formIdValue, updateValue: forceIsFormSubmitted, resetValue: resetFormSubmitted } = useForceReducer()
    const [showSendButton, setShowSendButton] = useState<boolean>(true)
    const [isFormPending, setIsFormPending] = useState<boolean>(false)

    const onPending = useCallback(() => {
        setIsFormPending(true)
    }, [setIsFormPending])

    const onFinish = useCallback(() => {
        setShowSendButton(false)
        resetFormSubmitted()
    }, [setShowSendButton, resetFormSubmitted])

    const hideAndHandleFormSubmit = useCallback(() => {
        onHide()
        resetFormSubmitted()
        setShowSendButton(true)
    }, [onHide, resetFormSubmitted, setShowSendButton])

    return (
        <Modal backdrop="static" onHide={hideAndHandleFormSubmit} show={show} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Contact / Demande de devis</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ContactForm isSubmitted={formIdValue > 0} onFinish={onFinish} onPending={onPending}></ContactForm>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={hideAndHandleFormSubmit} variant="secondary">
                    Fermer
                </Button>
                {showSendButton && (
                    <Button onClick={() => forceIsFormSubmitted()} disabled={isFormPending}>
                        Envoyer
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    )
}

export default function CallToActionButton({ children, ...props }: CallToActionButtonProps) {
    const [modalShow, setModalShow] = useState<boolean>(false)

    const renderModal = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setModalShow(true)
    }, [])

    return (
        <>
            <Button onClick={renderModal} {...props}>
                {children}
            </Button>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}
