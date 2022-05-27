import React, { useState,useRef } from "react";
import { Button, Card, Image } from "react-bootstrap";
import classes from "./NewOpinion.module.css";
import user from "../../../assets/icons/user.png";
import ImageInput from "../../../ui/ImageInput";
import { MdSend } from "react-icons/md";
import AutocompleteInput from "../../../components/autocompleteInput/AutocompleteInput";


const NewOpinion = (props) => {
  const ref = useRef();
  const [value, setValue] = useState({formatted_address:''});
  const [message, setMessage] = useState(props.message);
  const [imagePreview] = useState(props.imagePreview);
  const [imageFile, setImageFile] = useState(props.image); //useState(isModify ? product.image : "");

  const notInModal = props.message === undefined;
  const hint = notInModal ? "Realizar nueva queja" : "Realizar comentario";

  const send = (message) => {
    const descriptionChanged = message !== "" && message !== props.message;
    const imageChanged = imageFile !== props.image;
    
    props.onSend(message, imageFile, descriptionChanged || imageChanged,value.formatted_address??'');
    setValue({formatted_address:''});
    console.log(ref.current.value);
    ref.current.value = '';
    console.log(ref.current.value);
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

          <AutocompleteInput ref={ref} value={value} setValue={setValue}/>

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
