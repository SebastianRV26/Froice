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
  Spinner,
} from "react-bootstrap";
import classes from "./OpinionComponent.module.css";
import userImg from "../../assets/icons/user.png";
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
import { getFriendlyTime, resizeImage, votesToString } from "../../utils/utils";
import useCreateDocument from "../../hooks/use-create-document";

const OpinionComponent = ({ element, refresh, onModify, onDelete }) => {
  let { id, name, publishedDate, description, userId, image } = element;

  const [likes, setLikes] = useState(element.likes);
  const [dislikes, setDislikes] = useState(element.dislikes);
  const [imagePreview, setImagePreview] = useState();

  const [commentModalShow, setCommentModalShow] = useState(false);
  const [modifyModalShow, setModifyModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [reportModalShow, setReportModalShow] = useState(false);
  const [votesLoading, setVoteLoading] = useState(false);
  const [descriptionMessage, setDescriptionMessage] = useState("");
  const [modifyOpinion] = useModify();
  const [addDoc] = useCreateDocument();
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
      onModify(opinion);
    }
    changeModal(setModifyModalShow);
  };

  const DeleteOpinion = async () => {
    await deleteHook(
      "opinions",
      element.id,
      "Se eliminó la opinión",
      "Error al eliminar opinión"
    );
    onDelete(element);
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

  const followUser = (userToFollow) => {
    console.log("Follow " + userToFollow);
  };

  const likeHandler = () => {
    setVoteLoading(true);
    const promises = [];
    if (likes.includes(currentUserId)) {
      promises.push(
        updateDoc(doc(db, "opinions", id), {
          likes: arrayRemove(currentUserId),
        }).then(() => {
          setLikes(likes.filter((id) => id !== currentUserId));
        })
      );
    } else {
      if (dislikes.includes(currentUserId)) {
        promises.push(
          updateDoc(doc(db, "opinions", id), {
            dislikes: arrayRemove(currentUserId),
          }).then(() => {
            setDislikes(dislikes.filter((id) => id !== currentUserId));
          })
        );
      }
      promises.push(
        updateDoc(doc(db, "opinions", id), {
          likes: arrayUnion(currentUserId),
        }).then(() => {
          setLikes([currentUserId, ...likes]);
        })
      );
    }
    Promise.all(promises).finally(() => setVoteLoading(false));
  };

  const dislikeHandler = () => {
    setVoteLoading(true);
    const promises = [];
    if (dislikes.includes(currentUserId)) {
      promises.push(
        updateDoc(doc(db, "opinions", id), {
          dislikes: arrayRemove(currentUserId),
        }).then(() => {
          setDislikes(dislikes.filter((id) => id !== currentUserId));
        })
      );
    } else {
      if (likes.includes(currentUserId)) {
        promises.push(
          updateDoc(doc(db, "opinions", id), {
            likes: arrayRemove(currentUserId),
          }).then(() => {
            setLikes(likes.filter((id) => id !== currentUserId));
          })
        );
      }
      promises.push(
        updateDoc(doc(db, "opinions", id), {
          dislikes: arrayUnion(currentUserId),
        }).then(() => {
          setDislikes([currentUserId, ...dislikes]);
        })
      );
    }
    Promise.all(promises).finally(() => setVoteLoading(false));
  };

  return (
    <>
      <div className={classes.opinionContainer}>
        <div className={classes.voteContainer}>
          <button
            className={`${classes.voteBtn} ${classes.like} ${
              likes.includes(currentUserId) ? classes.selected : ""
            }`}
            onClick={likeHandler.bind(null, id)}
          >
            <i className="fas fa-angle-up"></i>
          </button>
          <div className={classes.count}>
            {votesLoading && (
              <Spinner animation="grow" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            )}
            {!votesLoading && (
              <>{votesToString(likes.length - dislikes.length)}</>
            )}
          </div>
          <button
            className={`${classes.voteBtn} ${classes.dislike} ${
              dislikes.includes(currentUserId) ? classes.selected : ""
            }`}
            onClick={dislikeHandler.bind(null, id)}
          >
            <i className="fas fa-angle-down"></i>
          </button>
        </div>
        <div className="ps-4">
          <div>
            <Image
              src={userImg}
              width="42"
              height="42"
              roundedCircle
              className="align-middle"
              //className="d-inline-block align-top" //{classes.image}
              alt="Imagen de perfil"
            />
            <div className="d-inline-block align-middle mx-2">
              <span className="fw-bold">{name}</span>
              <br></br>
              <span>
                {getFriendlyTime(
                  publishedDate?.toDate ? publishedDate.toDate() : publishedDate
                )}
              </span>
            </div>
            {!isOpinionFromCurrentUser && (
              <Button
                className={classes.time}
                variant="secondary"
                onClick={followUser.bind(null, userId)}
              >
                Seguir
              </Button>
            )}
          </div>
          <div className="my-3">
            {description}
            {image && (
              <div className={classes.opinionImage}>
                <Image fluid src={imagePreview} />
              </div>
            )}
          </div>
          <div className={classes.actionButtons}>
            <Button
              variant="primary"
              onClick={changeModal.bind(null, setCommentModalShow)}
            >
              Comentar
            </Button>
            <DropdownButton
              className={classes.options}
              as={ButtonGroup}
              title="..."
              id="bg-vertical-dropdown-1"
              drop="up"
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
          </div>
        </div>
      </div>

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
    </>
  );
};

export default OpinionComponent;
