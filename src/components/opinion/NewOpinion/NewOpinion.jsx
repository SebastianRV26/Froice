import React, { useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import classes from "./NewOpinion.module.css";
import user from "../../../assets/icons/user.png";
import ImageInput from "../../../ui/ImageInput";

const NewOpinion = (props) => {
  const [message, setMessage] = useState(props.message);
  const [imagePreview, setImagePreview] = useState();
  const [imageFile, setImageFile] = useState(""); //useState(isModify ? product.image : "");

  const notInModal = props.message === undefined;
  const hint = notInModal ? "Realizar nueva queja" : "Realizar comentario"

  const send = (message) => {
    const messageChanged = message !== "" && message !== props.message;
    props.onSend(message, messageChanged);
    setMessage("");
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

          <Button
            onClick={() => {
              send(message);
            }}
            variant="primary"
            className={classes.send}
          >
            Enviar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewOpinion;
