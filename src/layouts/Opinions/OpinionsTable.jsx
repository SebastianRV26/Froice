import React from "react";
import CreateOpinion from "./CreateOpinion";
import OpinionComponent from "./OpinionComponent";
//import classes from "./OpinionsTable.module.css";

const OpinionsTable = ({ data }) => {
  return (
    <div>
      <CreateOpinion />
      {data.length > 0 ? (
        data.map((el) => <OpinionComponent key={el.id} element={el} />)
      ) : (
        <p>Sin datos</p>
      )}
    </div>
  );
};

export default OpinionsTable;
