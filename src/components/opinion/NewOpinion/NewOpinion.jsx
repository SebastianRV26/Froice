import React, { useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import classes from "./NewOpinion.module.css";
import user from "../../../assets/icons/user.png";
import ImageInput from "../../../ui/ImageInput";
import Tags from "../../Tags/Tags"
import { tags } from "../../../utils/tags";


const NewOpinion = (props) => {
  const [message, setMessage] = useState(props.message);
  const [imagePreview] = useState(props.imagePreview);
  const [imageFile, setImageFile] = useState(props.image); //useState(isModify ? product.image : "");
  const [showtags, setShowTags] = useState(false)
  const [taglist, setTagList] = useState(tags)
  const [lista, setLista] = useState([])

  const notInModal = props.message === undefined;
  const hint = notInModal ? "Realizar nueva queja" : "Realizar comentario";

  const addTag = (name) => {
    console.log(name)
    setLista(lista => lista.includes(name) ? lista : lista.concat(name))
  }
  const send = (message, lista) => {
    console.log(lista);
    setShowTags(false);
    setLista([])
    const descriptionChanged = message !== "" && message !== props.message;
    const imageChanged = imageFile !== props.image;
    props.onSend(message, imageFile, descriptionChanged || imageChanged, lista);
  };

  return (
    <>
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
                send(message, lista);
              }}
              variant="primary"
              className={classes.send}
            >
              Enviar
            </Button>
            {notInModal &&
              <Button
                onClick={() => {
                  setShowTags(true)
                }}
                variant="primary"
                className={classes.send}
              >
                Agregar Tags
              </Button>
            }

          </div>
          {showtags &&
            taglist.map((tag) => (
              <Tags key={tag} name={tag} click={() => {
                addTag(tag)
              }} />
            ))}
        </Card.Body>
      </Card>
    </>

  );
};

export default NewOpinion;
