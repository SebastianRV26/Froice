import React from 'react'
import { Image } from 'react-bootstrap';
import sadFace from "../assets/sad-face.svg";
import classes from "./WithoutData.module.css";

const WithoutData = () => {
  return (
    <div className={classes.empty}>
        <Image src={sadFace} alt="Cara triste" />
        <h2>No se ha encontrado ningún comentario</h2>
        <p>Pruebe realizar un comentario o ajustar el filtro de búsqueda</p>
      </div>
  )
}

export default WithoutData