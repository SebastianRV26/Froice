import React, { useState } from "react";
import Tags from "./Tags";
import classes from "./SelectTags.module.css";
import { Button } from "react-bootstrap";

const SelectTags = () => {
  const [canSend, setCanSend] = useState(false);
  const [names, setNames] = useState([]);

  const len = 5;

  const send = () => {
    console.log(names);
  };

  return (
    <div className={classes.center}>
      <h3>Por favor seleccione {len} temas de su preferencia:</h3>
      <Tags onCandSend={setCanSend} onSetNames={setNames} groupsOf={len} />
      <Button
        disabled={!canSend}
        onClick={() => {
          send();
        }}
      >
        Enviar
      </Button>
    </div>
  );
};

export default SelectTags;
