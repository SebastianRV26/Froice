import React, { useEffect, useState } from "react";
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
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase/firebase.config";
import { getDownloadURL, ref } from "firebase/storage";
import useDeleteImage from "../../hooks/use-delete-image";
import { resizeImage } from "../../utils/utils";

const OpinionComponent = ({ element }) => {
  let { id, name, publishedDate, description, userId, image } = element;

  const [likes, setLikes] = useState(element.likes);
  const [dislikes, setDislikes] = useState(element.dislikes);
  const [imagePreview, setImagePreview] = useState();

  const [commentModalShow, setCommentModalShow] = useState(false);
  const [modifyModalShow, setModifyModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  const [modifyOpinion] = useModify();
  const [deleteHook] = useDelete();
  const [uploadImage] = useUploadImage();
  const [deleteImage] = useDeleteImage();

  const authData = useAuth();
  const currentUserId = authData.user.uid;
  const isOpinionFromCurrentUser = currentUserId === userId;

  useEffect(() => {
    const fetchImageUrl = async (path) => {
      const imageUrl = await getDownloadURL(ref(storage, path));
      setImagePreview(imageUrl);
    };

    if (image) {
      fetchImageUrl(image);
    }
  }, [image]);

  const changeModal = (setModal) => {
    setModal((prevModalShow) => !prevModalShow);
  };

  const Comment = () => {
    changeModal(setCommentModalShow);
  };

  const ModifyOpinion = async (newDescription, imageFile, messageChanged) => {
    if (messageChanged) {
      const imagePath = `opinions/${id}.jpg`;
      let opinion = {
        ...element,
        description: newDescription,
        image: imageFile ? imagePath : null,
      };
      await modifyOpinion(
        "opinions",
        element.id,
        opinion,
        "Opinión editada",
        "Error al editar opinión"
      );
      if (imageFile !== image) {
        if (imageFile) {
          const resizedImage = await resizeImage({
            file: imageFile,
            maxSize: 1500,
          });
          await uploadImage(imagePath, resizedImage);
        } else {
          await deleteImage(imagePath);
        }
      }
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
    changeModal(setReportModalShow);
  };

  const getFriendlyTime = () => {
    const currentDate = new Date();
    const opinionDate = publishedDate.toDate();
    const secondsDiff = (currentDate.getTime() - opinionDate.getTime()) / 1000;
    if (secondsDiff < 60) {
      return "Hace unos segundos";
    }
    if (secondsDiff < 3600) {
      return "Hace unos minutos";
    }
    if (secondsDiff < 86400) {
      return "Hace unas horas";
    }
    return opinionDate.toDateString();
  };

  const followUser = (userToFollow) => {
    console.log("Follow " + userToFollow);
  };

  const likeHandler = () => {
    if (likes.includes(currentUserId)) {
      const document = doc(db, "opinions", id);
      updateDoc(document, {
        likes: arrayRemove(currentUserId),
      }).then(() => {
        setLikes(likes.filter((id) => id !== currentUserId));
      });
    } else {
      if (dislikes.includes(currentUserId)) {
        dislikeHandler();
      }
      const document = doc(db, "opinions", id);
      updateDoc(document, {
        likes: arrayUnion(currentUserId),
      }).then(() => {
        setLikes([currentUserId, ...likes]);
      });
    }
  };

  const dislikeHandler = () => {
    if (dislikes.includes(currentUserId)) {
      const document = doc(db, "opinions", id);
      updateDoc(document, {
        dislikes: arrayRemove(currentUserId),
      }).then(() => {
        setDislikes(dislikes.filter((id) => id !== currentUserId));
      });
    } else {
      if (likes.includes(currentUserId)) {
        likeHandler();
      }
      const document = doc(db, "opinions", id);
      updateDoc(document, {
        dislikes: arrayUnion(currentUserId),
      }).then(() => {
        setDislikes([currentUserId, ...dislikes]);
      });
    }
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
              <Button onClick={likeHandler.bind(null, id)}>+</Button>
              <Button disabled>{likes.length - dislikes.length}</Button>
              <Button onClick={dislikeHandler.bind(null, id)}>-</Button>
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
              <div className="mb-2">
                {image && <Image src={imagePreview} />}
              </div>
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
            onSend={(newDescription, imageFile, messageChanged) => {
              ModifyOpinion(newDescription, imageFile, messageChanged);
            }}
            message={description}
            image={image}
            imagePreview={imagePreview}
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
        <ConfirmationModal
          show={reportModalShow}
          title={"Reportar opinión"}
          myButtonTitle="Reportar"
          description={"Está seguro de que desea reportar esta opinión?"}
          onConfirm={ReportOpinion}
          onHide={() => changeModal(setReportModalShow)}
        />
      )}
    </div>
  );
};

export default OpinionComponent;
