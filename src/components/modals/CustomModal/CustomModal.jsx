import React from "react";
import { Button, Modal } from "react-bootstrap";

const CustomModal = ({
  show,
  title,
  onConfirm,
  onHide,
  children,
  myButtonTitle,
}) => {
  const showButtons = onConfirm === undefined;
  const buttonTitle = myButtonTitle ? myButtonTitle : "Guardar";

  return (
    <Modal
      show={show}
      title={title}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {!showButtons && (
        <Modal.Footer>
          <Button onClick={onConfirm}>{buttonTitle}</Button>
          <Button onClick={onHide} variant="secondary">
            Cancelar
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CustomModal;
