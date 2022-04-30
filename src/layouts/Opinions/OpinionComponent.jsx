import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Dropdown,
  DropdownButton,
  Image,
  Navbar,
} from "react-bootstrap";
import classes from "./OpinionComponent.module.css";
import user from "../../assets/icons/user.png";
import CustomModal from "../../components/modals/CustomModal/CustomModal";
import NewOpinion from "../../components/opinion/NewOpinion/NewOpinion";
import useModify from "../../hooks/use-modify";
import useDelete from "../../hooks/use-delete";
import ConfirmationModal from "../../components/modals/ConfirmationModal/ConfirmationModal";
import useAuth from "../../hooks/use-auth";
import useUploadImage from "../../hooks/use-upload-image";

const OpinionComponent = ({ element }) => {
  let { name, date, time, description, likes, userId } = element;
  const [commentModalShow, setCommentModalShow] = useState(false);
  const [modifyModalShow, setModifyModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  const [modifyOpinion] = useModify();
  const [deleteHook] = useDelete();
  const [uploadImage, loadingImage] = useUploadImage();

  const authData = useAuth();
  const currentUserId = authData.user.uid;
  const isOpinionFromCurrentUser = currentUserId === userId;

  const ChangeCommentModal = () => {
    setCommentModalShow((prevModalShow) => !prevModalShow);
  };

  const ChangeDeleteModal = () => {
    setDeleteModalShow((prevModalShow) => !prevModalShow);
  };

  const ChangeModifyModal = () => {
    setModifyModalShow((prevModalShow) => !prevModalShow);
  };

  const ChangeReportModal = () => {
    setReportModalShow((prevModalShow) => !prevModalShow);
  };

  const Comment = () => {};

  const ModifyOpinion = (newDescription, messageChanged) => {
    if (messageChanged) {
      let opinionId = "XDXD";
      let opinion = {
        name,
        time,
        likes,
        opinionId,
        description: newDescription,
      };
      modifyOpinion(
        "opinions",
        opinionId,
        opinion, //element
        "Opinión editada",
        "Error al editar opinión"
      );
      console.log("Sí cambió");
    }
    console.log("xd");
    setModifyModalShow(false);
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

  const ReportOpinion = () => {
    console.log("Reportar");
  };

  const getFriendlyTime = () => {
    let current = new Date();
    let cDate =
      current.getFullYear() +
      "-" +
      (current.getMonth() + 1) +
      "-" +
      current.getDate();

    const [year, month, day] = date.split("-");
    const [hours, minutes, mSeconds] = time.split(":");
    // console.log(year, month, day);

    let message = "Hace unos minutos";
    if (cDate === date) {
      let cSeconds = current.getHours() * 3600 + current.getMinutes() * 60;
      let seconds = hours * 3600 + minutes * 60;
      //cSeconds > seconds
      let diference = cSeconds - seconds;
      // console.log(diference);
      if (diference === 0) {
        message = "Hace unos segundos";
      } else if (diference < 3600) {
        message = `Hace ${current.getMinutes() - minutes} minutos`;
      } else {
        message = `Hace ${current.getHours() - hours} horas`;
      }
    } else {
      message = "Hace unos dias XD";
    }

    return message;
  };

  return (
    <div>
      <Card className={classes.myrow}>
        <Card.Body>
          <DropdownButton
            className={classes.options}
            as={ButtonGroup}
            title="..."
            id="bg-vertical-dropdown-1"
          >
            {isOpinionFromCurrentUser && (
              <Dropdown.Item eventKey="1" onClick={ChangeModifyModal}>
                Modificar
              </Dropdown.Item>
            )}
            {isOpinionFromCurrentUser && (
              <Dropdown.Item eventKey="2" onClick={ChangeDeleteModal}>
                Eliminar
              </Dropdown.Item>
            )}
            {!isOpinionFromCurrentUser && (
              <Dropdown.Item eventKey="3" onClick={ChangeReportModal}>
                Reportar
              </Dropdown.Item>
            )}
          </DropdownButton>
          <div className={classes.container}>
            <ButtonGroup vertical>
              <Button>+</Button>
              <Button disabled>{likes}</Button>
              <Button>-</Button>
            </ButtonGroup>

            <div className={classes.item2}>
              <Navbar bg="light">
                <Container>
                  <Navbar.Brand>
                    <Image
                      src={user}
                      width="35"
                      height="35"
                      roundedCircle
                      className="d-inline-block align-top" //{classes.image}
                      alt="React Bootstrap logo"
                    />
                  </Navbar.Brand>
                  <Navbar.Brand>{name}</Navbar.Brand>
                  <Navbar.Brand className={classes.time}>
                    {getFriendlyTime()}
                  </Navbar.Brand>
                  {!isOpinionFromCurrentUser && (
                    <Button className={classes.time} variant="secondary">
                      Seguir
                    </Button>
                  )}
                </Container>
              </Navbar>

              <Card.Text>{description}</Card.Text>
              <Button onClick={ChangeCommentModal} variant="primary">
                Comment
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/*Commet Modal */}
      {commentModalShow && (
        <CustomModal
          show={commentModalShow}
          title="Comentar opinión"
          message=""
          onHide={() => setCommentModalShow(false)}
        >
          <NewOpinion onSend={Comment} message="" />
        </CustomModal>
      )}

      {/*Modify Modal */}
      {modifyModalShow && (
        <CustomModal
          show={modifyModalShow}
          title="Modificar opinión"
          onHide={() => setModifyModalShow(false)}
        >
          <NewOpinion
            onSend={(newDescription, messageChanged) => {
              ModifyOpinion(newDescription, messageChanged);
            }}
            message={description}
          />
        </CustomModal>
      )}

      {/*Delete Modal */}
      {deleteModalShow && (
        <ConfirmationModal
          show={deleteModalShow}
          title={"Eliminar opinión"}
          description={"Está seguro de que desea eliminar esta opinión?"}
          onConfirm={DeleteOpinion}
          onHide={() => setDeleteModalShow(false)}
        />
      )}

      {/*Report Modal */}
      {reportModalShow && (
        <ConfirmationModal
          show={reportModalShow}
          title={"Reportar opinión"}
          description={"Está seguro de que desea reportar esta opinión?"}
          onConfirm={ReportOpinion}
          onHide={() => setReportModalShow(false)}
        />
      )}
    </div>
  );
};

export default OpinionComponent;
