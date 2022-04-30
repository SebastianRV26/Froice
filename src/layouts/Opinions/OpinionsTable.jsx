import React from "react";
import WithoutData from "../../ui/WithoutData";
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
        <WithoutData />
      )}
    </div>
  );
};

export default OpinionsTable;
