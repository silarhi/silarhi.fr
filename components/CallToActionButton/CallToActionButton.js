import ContactForm from "components/ContactForm/ContactForm"
import useForceReducer from "hooks/reducer"
import {useCallback, useState} from "react"
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'

function MyVerticallyCenteredModal({onHide, ...props}) {
  const {
    value: isFormSubmitted,
    updateValue: forceIsFormSubmitted,
    resetValue: resetFormSubmitted
  } = useForceReducer()
  const [showSendButton, setShowSendButton] = useState(true)

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
    <Modal
      backdrop={"static"}
      onHide={hideAndHandleFormSubmit}
      {...props}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Contact / Demande de devis
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContactForm isSubmitted={isFormSubmitted} onFinish={onFinish}></ContactForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideAndHandleFormSubmit} variant={"secondary"}>Fermer</Button>
        {showSendButton && (
          <Button onClick={() => forceIsFormSubmitted()}>Envoyer</Button>
        )}
      </Modal.Footer>
    </Modal>
  )
}

export default function CallToActionButton({children, ...props}) {
  const [modalShow, setModalShow] = useState(false)

  const renderModal = useCallback((e) => {
    e.preventDefault()
    setModalShow(true)
  }, [])

  return (
    <>
      <Button onClick={renderModal} {...props}>
        {children}
      </Button>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  )
}
