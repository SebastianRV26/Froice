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
import useCreateDocument from "../../hooks/use-create-document";

const OpinionComponent = ({ element }) => {
  let { name, date, time, description, likes, userId } = element;
  const [commentModalShow, setCommentModalShow] = useState(false);
  const [modifyModalShow, setModifyModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  const [descriptionMessage, setDescriptionMessage] = useState("");
  const [modifyOpinion] = useModify();
  const [addDoc] = useCreateDocument();
  const [deleteHook] = useDelete();
  const [uploadImage, loadingImage] = useUploadImage();

  const authData = useAuth();
  const currentUserId = authData.user.uid;
  const isOpinionFromCurrentUser = currentUserId === userId;

  const changeModal = (setModal) => {
    setModal((prevModalShow) => !prevModalShow);
  };

  const Comment = () => {
    console.log("Comentario");
    changeModal(setCommentModalShow);
  };

  const ModifyOpinion = (newDescription, messageChanged) => {
    if (messageChanged) {
      let opinion = { ...element, description: newDescription };
      modifyOpinion(
        "opinions",
        element.id,
        opinion,
        "Opinión editada",
        "Error al editar opinión"
      );
      console.log("Sí cambió");
    }
    changeModal(setModifyModalShow);
  };

  const DeleteOpinion = () => {
    deleteHook(
      "opinions",
      element.id,
      "Se eliminó la opinión",
      "Error al eliminar opinión"
    );
    changeModal(setDeleteModalShow);
  };

  const ReportOpinion = () => {
    const data = {
      reportedId: userId,
      reportedName: name,
      reporterId: currentUserId,
      reporterName: authData.user.displayName,
      opinionId: element.id,
      opinionText: description,
      description: descriptionMessage,
    };
    addDoc("reports", "Reporte", data);
    changeModal(setReportModalShow);
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
      if (diference === 0) {
        message = "Hace unos segundos";
      } else if (diference < 3600) {
        message = `Hace ${diference / 60} minutos`;
      } else {
        message = `Hace ${current.getHours() - hours} horas`;
      }
    } else {
      message = "Hace unos dias XD";
    }
    return message;
  };

  const followUser = (userToFollow) => {
    console.log("Follow " + userToFollow);
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
              <Dropdown.Item
                eventKey="1"
                onClick={() => {
                  changeModal(setModifyModalShow);
                }}
              >
                Modificar
              </Dropdown.Item>
            )}
            {isOpinionFromCurrentUser && (
              <Dropdown.Item
                eventKey="2"
                onClick={() => {
                  changeModal(setDeleteModalShow);
                }}
              >
                Eliminar
              </Dropdown.Item>
            )}
            {!isOpinionFromCurrentUser && (
              <Dropdown.Item
                eventKey="3"
                onClick={() => {
                  changeModal(setReportModalShow);
                }}
              >
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
                <Container className={classes.container}>
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
                    <Button
                      className={classes.time}
                      variant="secondary"
                      onClick={() => {
                        followUser(userId);
                      }}
                    >
                      Seguir
                    </Button>
                  )}
                </Container>
              </Navbar>

              <Card.Text>{description}</Card.Text>
              <Button
                onClick={() => {
                  changeModal(setCommentModalShow);
                }}
                variant="primary"
              >
                Comentar
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
          onHide={() => changeModal(setCommentModalShow)}
        >
          <NewOpinion onSend={Comment} message="" />
        </CustomModal>
      )}

      {/*Modify Modal */}
      {modifyModalShow && (
        <CustomModal
          show={modifyModalShow}
          title="Modificar opinión"
          onHide={() => changeModal(setModifyModalShow)}
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
          myButtonTitle="Eliminar"
          description={"Está seguro de que desea eliminar esta opinión?"}
          onConfirm={DeleteOpinion}
          onHide={() => changeModal(setDeleteModalShow)}
        />
      )}

      {/*Report Modal */}

      {reportModalShow && (
        <CustomModal
          show={reportModalShow}
          title={"Reportar opinión"}
          onHide={() => changeModal(setReportModalShow)}
          onConfirm={ReportOpinion}
          myButtonTitle={"Reportar"}
        >
          <div className="mx-2">
            <p>Por Favor ingrese el motivo del reporte</p>
            <textarea
              placeholder={"ingrese el motivo"}
              value={descriptionMessage}
              onChange={(e) => setDescriptionMessage(e.target.value)}
              className={classes.ta}
            />
          </div>
        </CustomModal>
      )}

    </div>
  );
};

export default OpinionComponent;
