import React, { useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import classes from "./NewOpinion.module.css";
import user from "../../../assets/icons/user.png";
import ImageInput from "../../../ui/ImageInput";
import { MdSend } from "react-icons/md";
import AutocompleteInput from "../../../components/autocompleteInput/AutocompleteInput";


const NewOpinion = (props) => {
  const [message, setMessage] = useState(props.message);
  const [imagePreview] = useState(props.imagePreview);
  const [imageFile, setImageFile] = useState(props.image); //useState(isModify ? product.image : "");

  const notInModal = props.message === undefined;
  const hint = notInModal ? "Realizar nueva queja" : "Realizar comentario";

  const send = (message) => {
    const descriptionChanged = message !== "" && message !== props.message;
    const imageChanged = imageFile !== props.image;
    props.onSend(message, imageFile, descriptionChanged || imageChanged);
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

          <AutocompleteInput/>

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
    </Card>
  );
};

export default NewOpinion;
