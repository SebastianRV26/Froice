import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import useCreateDocument from "../../hooks/use-create-document";
import useDelete from "../../hooks/use-delete";

const ReportActionModal = (props) => {
  const report = props.report;

  const [validated, setValidated] = useState(false);
  const [reason, setReason] = useState();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [createHook, loadingCreate] = useCreateDocument();
  const [deleteHook, loadingDelete] = useDelete();

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

  const deleteCommentHandler = () => {
    const createResponsePromise = createHook(
      `users/${report.reportedId}/reports`,
      "Respuesta",
      {
        reporterName: report.reporterName,
        opinionText: report.opinionText,
        description: report.description,
        response: reason,
        status: 1,
      }
    );
    const deleteCommentPromise = deleteHook(
      "opinions",
      report.opinionId,
      "Se eliminó el comentario correctamente",
      "Error al eliminar el comentario"
    );
    const deleteReportPromise = deleteHook(
      "reports",
      report.id,
      "Se eliminó el reporte correctamente",
      "Error al eliminar el reporte"
    );
    Promise.all([
      createResponsePromise,
      deleteCommentPromise,
      deleteReportPromise,
    ]).then(() => {
      props.onHide();
      props.onSuccess();
    });
  };

  const cancelReportHandler = () => {
    const createResponsePromise = createHook(
      `users/${report.reporterId}/reports`,
      "Respuesta",
      {
        reportedName: report.reportedName,
        opinionText: report.opinionText,
        description: report.description,
        response: reason,
        status: 0,
      }
    );
    const deleteReportPromise = deleteHook(
      "reports",
      report.id,
      "Se eliminó el reporte correctamente",
      "Error al eliminar el reporte"
    );
    Promise.all([createResponsePromise, deleteReportPromise]).then(() => {
      props.onHide();
      props.onSuccess();
    });
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
          onConfirm={
            props.actionType === "comment"
              ? deleteCommentHandler
              : cancelReportHandler
          }
          onHide={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
};

export default ReportActionModal;
