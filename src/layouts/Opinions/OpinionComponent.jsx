import React, { useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import classes from "./OpinionComponent.module.css";
import user from "../../assets/icons/user.png";
import CustomModal from "../../components/modals/CustomModal/CustomModal";
import NewOpinion from "../../components/opinion/NewOpinion/NewOpinion";
import useModify from "../../hooks/use-modify";
import useDelete from "../../hooks/use-delete";
import ConfirmationModal from "../../components/modals/ConfirmationModal/ConfirmationModal";

const OpinionComponent = ({ element }) => {
  let { name, time, description } = element;
  const [modalShow, setModalShow] = useState(false);
  const [modifyModalShow, setModifyModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [modifyOpinion] = useModify();
  const [deleteHook] = useDelete();

  const ChangeModal = () => {
    setModalShow((prevModalShow) => !prevModalShow);
  };

  const ChangeDeleteModal = () => {
    setDeleteModalShow((prevModalShow) => !prevModalShow);
  };

  const ChangeModifyModal = () => {
    setModifyModalShow((prevModalShow) => !prevModalShow);
  };

  const Comment = () => {};

  const ModifyOpinion = () => {
    let opinionId = "xd";
    let opinion = {};
    modifyOpinion(
      "opinions",
      opinionId,
      opinion,
      "Opinión editada",
      "Error al editar opinión"
    );
  };

  const DeleteOpinion = () => {
    let opinionId = "XDXD";
    deleteHook(
      "opinions",
      opinionId,
      "Se elimino la opinión",
      "Error al eliminar opinión"
    );
  };

  return (
    <div>
      <Card className={classes.myrow}>
        <Card.Body>
          <Button className={classes.options} onClick={ChangeModifyModal}>
            ...
          </Button>
          <div className={classes.container}>
            <div className={classes.item1}>
              <Button variant="secondary">+</Button>
              <p style={{ marginTop: "revert" }}>0</p>
              <Button variant="secondary">-</Button>
            </div>
            <div className={classes.item2}>
              <div className={classes.container}>
                <Image src={user} roundedCircle className={classes.image} />
                <h5>{name}</h5>
                <h5 className={classes.time}>{time}</h5>
                <Button className={classes.time} variant="secondary">
                  Follow
                </Button>
              </div>
              <Card.Text>{description}</Card.Text>
              <Button onClick={ChangeModal} variant="primary">
                Comment
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/*Commet Modal */}
      {modalShow && (
        <CustomModal
          show={modalShow}
          title="Comentar opinión"
          onConfirm={() => {}}
          onHide={() => setModalShow(false)}
        >
          <NewOpinion onSend={Comment} message="" />
        </CustomModal>
      )}

      {/*Modify Modal */}
      {modifyModalShow && (
        <CustomModal
          show={modifyModalShow}
          title="Modificar opinión"
          onConfirm={() => {}}
          onHide={() => setModifyModalShow(false)}
        >
          <NewOpinion onSend={ModifyOpinion} message={description} />
        </CustomModal>
      )}

      {/*Delete Modal */}
      {deleteModalShow && (
        <ConfirmationModal
          show={deleteModalShow}
          title={"Eliminar opinión"}
          description={"Está seguro de que desea eliminar opinión?"}
          onConfirm={DeleteOpinion}
          onHide={() => setDeleteModalShow(false)}
        />
      )}
    </div>
  );
};

export default OpinionComponent;
