import React, { useState } from "react";
import { Button, Card, Form, Image } from "react-bootstrap";
import classes from "./NewOpinion.module.css";
import user from "../../../assets/icons/user.png";
import ImageInput from "../../../ui/ImageInput";
import { MdSend } from "react-icons/md";
import AutocompleteInput from "../../../components/autocompleteInput/AutocompleteInput";
import CustomModal from "../../modals/CustomModal/CustomModal";
import { AiOutlineUser, AiOutlineLink } from "react-icons/ai";

const NewOpinion = (props) => {
  const [message, setMessage] = useState(props.message ? props.message : "");
  const [imagePreview] = useState(props.imagePreview);
  const [imageFile, setImageFile] = useState(props.image); //useState(isModify ? product.image : "");
  const [urlPeopeModalShow, setUrlPeopeModalShow] = useState(false);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);

  const notInModal = props.message === undefined;
  const hint = notInModal ? "Realizar nueva queja" : "Realizar comentario";

  const send = (message) => {
    const descriptionChanged = message !== "" && message !== props.message;
    const imageChanged = imageFile !== props.image;
    props.onSend(message, imageFile, descriptionChanged || imageChanged, urls);
  };

  const changeModal = (setModal) => {
    setModal((prevModalShow) => !prevModalShow);
  };

  const addUrl = () => {
    setMessage((prev) => `${prev}@${name}`);
    setUrls((prev) => [...prev, url]);
    setName("");
    setUrl("");
    changeModal(setUrlPeopeModalShow);
  };

  return (
    <Card className={notInModal && classes.myrow}>
      <Card.Body>
        <div className={classes.container}>
          <Image src={user} roundedCircle className={classes.image} />
          <textarea
            placeholder={hint}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={classes.ta}
          />
        </div>
        <div>
          <div className={`${classes.image} my-2`}>
            <ImageInput url={imagePreview} onFileChange={setImageFile} />
          </div>

          <div className={classes.buttonsContainer}>
            <AutocompleteInput />
            <Button onClick={changeModal.bind(null, setUrlPeopeModalShow)}>
              @
            </Button>
          </div>

          <Button
            onClick={() => {
              send(message);
            }}
            variant="primary"
            className={classes.send}
          >
            <MdSend />
          </Button>
        </div>
      </Card.Body>

      {/*Commet Modal */}
      {urlPeopeModalShow && (
        <CustomModal
          show={urlPeopeModalShow}
          title="Agregar enlace a usuario"
          message=""
          myButtonTitle="Agregar"
          onConfirm={addUrl}
          onHide={() => changeModal(setUrlPeopeModalShow)}
        >
          <Form onSubmit={changeModal}>
            <Form.Group className="py-2">
              <span className="p-2 input-icon">
                <AiOutlineUser />
              </span>
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

            <Form.Group className="py-2">
              <span className="p-2 input-icon">
                <AiOutlineLink />
              </span>
              <Form.Control
                className="input-spacing"
                type="text"
                placeholder="Url del usuario"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Ingrese un usuario válido.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </CustomModal>
      )}
    </Card>
  );
};

export default NewOpinion;
