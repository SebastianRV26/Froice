import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Image,
  Spinner,
} from "react-bootstrap";
import classes from "./OpinionComponent.module.css";
import defUserImg from "../../assets/icons/user.png";
import CustomModal from "../../components/modals/CustomModal/CustomModal";
import NewOpinion from "../../components/opinion/NewOpinion/NewOpinion";
import useModify from "../../hooks/use-modify";
import useDelete from "../../hooks/use-delete";
import ConfirmationModal from "../../components/modals/ConfirmationModal/ConfirmationModal";
import useAuth from "../../hooks/use-auth";
import useUploadImage from "../../hooks/use-upload-image";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase/firebase.config";
import { getDownloadURL, ref } from "firebase/storage";
import useDeleteImage from "../../hooks/use-delete-image";
import { getFriendlyTime, resizeImage, votesToString } from "../../utils/utils";
import useCreateDocument from "../../hooks/use-create-document";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const OpinionComponent = ({ element, onModify, onDelete }) => {
  let {
    id,
    name,
    publishedDate,
    description,
    userId,
    image,
    urls,
    userPhoto,
    tags,
  } = element;

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
  const userData = useSelector((state) => state.user.userData);

  const [descriptionToShow, setDescriptionToShow] = useState([]);

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

  const Comment = async (description, imageFile, messageChanged) => {
    if (messageChanged) {
      const opinionRef = doc(collection(db, "opinions"));

      const name = authData.user.displayName;
      const userId = authData.user.uid;
      const imagePath = imageFile ? `opinions/${opinionRef.id}.jpg` : null;
      const opinion = {
        name,
        userId,
        description,
        likes: [],
        dislikes: [],
        parent: element.id,
        publishedDate: new Date(),
        image: imagePath,
      };
      await addDoc("opinions", "Opinión", opinion, opinionRef);
      if (imageFile) {
        const resizedImage = await resizeImage({
          file: imageFile,
          maxSize: 1500,
        });
        await uploadImage(imagePath, resizedImage);
      }
      setCommentModalShow(false);
    }
  };

  const ModifyOpinion = async (
    newDescription,
    imageFile,
    messageChanged,
    urls,
    newTagList
  ) => {
    if (messageChanged) {
      const imagePath = `opinions/${id}.jpg`;
      let opinion = {
        ...element,
        description: newDescription,
        tags: newTagList,
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
    const document = doc(db, "users", currentUserId);
    updateDoc(document, {
      following: userData?.following?.includes(userToFollow)
        ? arrayRemove(userToFollow)
        : arrayUnion(userToFollow),
    });
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

  useEffect(() => {
    const words = description.split(" ");
    let j = 0;
    for (let i in words) {
      const word = words[i];
      if (word.includes("@")) {
        let url;
        if (!urls[j].startsWith("https://") && !urls[j].startsWith("http://")) {
          url = "https://" + urls[j];
        } else {
          url = urls[j];
        }
        words[i] = (
          <a key={i} href={`${url}`} rel="noreferrer" target="_blank">
            {word}
          </a>
        );
        j++;
      } else {
        words[i] = <p key={i}>{word}</p>;
      }
    }
    setDescriptionToShow(words);
  }, []);

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
              src={userPhoto ? userPhoto : defUserImg}
              width="42"
              height="42"
              roundedCircle
              className="align-middle"
              //className="d-inline-block align-top" //{classes.image}
              alt="Imagen de perfil"
            />
            <div className="d-inline-block align-middle mx-2">
              <Link
                className="fw-bold"
                to={`/dashboard/opinions/users/${currentUserId}`}
              >
                {name}
              </Link>
              <br></br>
              <span>
                {getFriendlyTime(
                  publishedDate?.toDate ? publishedDate.toDate() : publishedDate
                )}
              </span>
            </div>
            {!isOpinionFromCurrentUser && userData && (
              <Button
                className={classes.time}
                variant="secondary"
                onClick={followUser.bind(null, userId)}
              >
                {userData?.following?.includes(userId)
                  ? "Dejar de seguir"
                  : "Seguir"}
              </Button>
            )}
            {!isOpinionFromCurrentUser && !userData && (
              <Spinner animation="grow" role="status">
                <span className="visually-hidden">Cargando...</span>
              </Spinner>
            )}
          </div>
          <div className="my-3">
            <div className={classes.descriptionContainer}>
              {descriptionToShow}
            </div>
            {image && (
              <div className={classes.opinionImage}>
                <Image fluid src={imagePreview} />
              </div>
            )}
            {tags?.length > 0 && (
              <div className="mt-2">Tags: {tags.join(", ")}</div>
            )}
          </div>
          <div className={classes.actionButtons}>
            <Button
              variant="primary"
              onClick={changeModal.bind(null, setCommentModalShow)}
            >
              Comentar
            </Button>
            <Button
              as={Link}
              to={`/dashboard/opinions/comments/${element.id}`}
              variant="primary"
            >
              Ver comentarios
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
            onSend={(
              newDescription,
              imageFile,
              messageChanged,
              urls,
              tagList
            ) => {
              ModifyOpinion(
                newDescription,
                imageFile,
                messageChanged,
                urls,
                tagList
              );
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
