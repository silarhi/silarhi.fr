import ContactForm from "components/ContactForm/ContactForm"
import {useCallback, useState} from "react"
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'

function MyVerticallyCenteredModal({onHide, ...props}) {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)

  const hideAndHandleFormSubmit = useCallback(() => {
    onHide()
    setIsFormSubmitted(false)
  }, [onHide, setIsFormSubmitted])

  return (
    <Modal
      onHide={hideAndHandleFormSubmit}
      {...props}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Contactez-moi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContactForm isSubmitted={isFormSubmitted}></ContactForm>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={hideAndHandleFormSubmit} variant={"secondary"}>Close</Button>
        <Button onClick={() => setIsFormSubmitted(true)}>Envoyer</Button>
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
