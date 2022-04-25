import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmationModal = ({
  show,
  title,
  description,
  onConfirm,
  onHide,
  loading,
}) => {
  return (
    <Modal
      show={show}
      title={title}
      description={description}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm} disabled={loading}>
          Confirmar
        </Button>
        <Button onClick={onHide} disabled={loading} variant="secondary">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
