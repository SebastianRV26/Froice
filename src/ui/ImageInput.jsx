import classes from "./ImageInput.module.css";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const ImageInput = (props) => {
  const [preview, setPreview] = useState(props.url);

  useEffect(() => {
    setPreview(props.url);
  }, [props.url]);

  const imageLoadHandler = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    if (props.onFileChange) props.onFileChange(selectedFile);
  };

  const removeHandler = () => {
    setPreview(undefined);
    if (props.onFileChange) props.onFileChange(undefined);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: imageLoadHandler,
    maxFiles: 1,
    accept: "image/jpeg,image/png",
  });

  const hoverStyle = preview ? classes.withImg : classes.noImg;
  const error = props.validated && !preview ? classes.error : "";

  return (
    <div
      className={`${classes.container} ${
        !preview ? classes.border : ""
      } ${error}`}
    >
      {preview && (
        <button className={classes.remove} onClick={removeHandler}>
          x
        </button>
      )}
      <div className={`${classes.dropzone} ${hoverStyle}`} {...getRootProps()}>
        <Form.Control type="file" {...getInputProps()} />
        <span className={classes.plusIcon}>+</span>
      </div>
      {preview && (
        <img className={classes.image} src={preview} alt="Preview"></img>
      )}
    </div>
  );
};

export default ImageInput;
