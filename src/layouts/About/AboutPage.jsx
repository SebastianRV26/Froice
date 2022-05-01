import React from "react";
import WorkerCards from "./WorkerCards";
import classes from "./AboutPage.module.css";

const AboutPage = () => {
  const workers = [
    {
      name: "Diego Rojas Vega",
      email: "diegovega25@gmail.com",
      role: "Project Manajer",
      github: "diegovega25",
      linkedin: "diego-rojas-vega",
    },
    {
      name: "Allen Jiménez González",
      email: "allenjimenezgonzalez@gmail.com",
      role: "Fullstack Developer",
      github: "AllenJimenezGonzalez",
      linkedin: "allen-jimenez-gonzalez",
    },
    {
      name: "Daniela Alvarado Otoya",
      email: "alvarado22daniela@gmail.com",
      role: "Fullstack Developer",
      github: "Ashly-22",
      linkedin: "daniela-alvarado-otoya",
    },
    {
      name: "Francisco Soto Quesada",
      email: "franrsq@gmail.com",
      role: "Fullstack Developer",
      github: "franrsq",
      linkedin: "francisco-soto-quesada",
    },
    {
      name: "Jairo Pacheco Campos",
      email: "pachecocamposjairo@gmail.com",
      role: "Fullstack Developer",
      github: "JairoPacheco",
      linkedin: "jairo-pacheco-campos-79089b140",
    },
    {
      name: "Sebastian Rojas Vargas",
      email: "sebastian.rojas.vargas.rv@gmail.com",
      role: "Fullstack Developer",
      github: "SebastianRV26",
      linkedin: "sebastian-rojas-vargas",
    },
  ];
  return (
    <div className={classes.view}>
      <h2>About page</h2>
      <p>Este proyecto fue desarrollado por las siguientes personas:</p>

      <WorkerCards workers={workers} />
    </div>
  );
};

export default AboutPage;
