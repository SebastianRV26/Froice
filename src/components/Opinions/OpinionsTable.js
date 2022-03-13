import React from "react";
import NewOpinion from "./NewOpinion";
import OpinionComponent from "./OpinionComponent";
import classes from "./OpinionsTable.module.css";

const OpinionsTable = ({ data }) => {
  return (
    <div>

      <NewOpinion />
      {data.length > 0 ? (
        data.map((el) => (
          <OpinionComponent
            key={el.id}
            element={el}
          />
        ))
      ) : (
        <p>Sin datos</p>
      )}

    </div>
  );
}

export default OpinionsTable;