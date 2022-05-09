import { Modal, Button, Form } from "react-bootstrap";
import React, { useState } from "react";
import useModify from "../../hooks/use-modify";
import { emailIsValid } from "../../utils/Matchers";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
// import classes from "./UserModal.module.css";

const UserModal = (props) => {
  const isModify = props.user != null;
  const [name, setName] = useState(isModify ? props.user.name : "");
  const [email, setEmail] = useState(isModify ? props.user.email : "");
  const [modifyUser, modifyLoading] = useModify();
  const [confirmationModal, setConfirmationModal] = useState(false);

  const title = "Modificar usuario";

  const userChanged = () => {
    let user = props.user;
    let flag = true;
    if (name === user.name && email === user.email) {
      flag = false;
    }
    return flag;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setConfirmationModal(true);
  };

  const modifyUserHandler = () => {
    if (userChanged()) {
      modifyUser(
        "users",
        props.user.id,
        {
          name,
          email,
        },
        "Usuario modificado correctamente",
        "Error al modificar el usuario"
      ).then(() => {
        props.onHide();
        props.onSuccess();
      });
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="py-2">
              <span className="far fa-user p-2 input-icon"></span>
              <Form.Control
                className="input-spacing"
                type="text"
                placeholder="Nombre del usuario"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Ingrese un usuario válido.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="py-1 pb-2">
              <span className="far fa-user p-2 input-icon"></span>
              <Form.Control
                className="input-spacing"
                type="text"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern={emailIsValid}
              />
              <Form.Control.Feedback type="invalid">
                Ingrese un correo valido.
              </Form.Control.Feedback>
            </Form.Group>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={props.onHide}
                disabled={modifyLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={modifyLoading}>
                Modificar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      {confirmationModal && (
        <ConfirmationModal
          show={confirmationModal}
          title={title}
          description={`¿Está seguro de que desea ${
            props.user ? "modificar" : "agregar"
          } usuario?`}
          onConfirm={modifyUserHandler}
          onHide={() => setConfirmationModal(false)}
        />
      )}
    </>
  );
};

export default UserModal;
