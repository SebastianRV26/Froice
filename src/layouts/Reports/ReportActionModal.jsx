import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";

const ReportActionModal = (props) => {
  const [validated, setValidated] = useState(false);
  const [reason, setReason] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const title =
    props.actionType === "comment" ? "Eliminar comentario" : "Cancelar reporte";

  const submitHandler = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      setShowConfirmModal(true);
    }
    setValidated(true);
  };

  return (
    <>
      <Modal
        show="true"
        onHide={props.onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Form onSubmit={submitHandler} noValidate validated={validated}>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Motivo</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" /*disabled={loading}*/>Confirmar</Button>
            <Button
              onClick={props.onHide}
              /*disabled={loading}*/ variant="secondary"
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      {showConfirmModal && (
        <ConfirmationModal
          show={showConfirmModal}
          title={title}
          description={`¿Está seguro de que desea ${
            props.actionType === "comment"
              ? "eliminar el comentario"
              : "cancelar el reporte"
          }`}
          //onConfirm={addUser}
          onHide={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
};

export default ReportActionModal;
