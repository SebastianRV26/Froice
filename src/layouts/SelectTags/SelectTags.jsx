import React, { useState } from "react";
import Tags from "./Tags";
import classes from "./SelectTags.module.css";
import { Button } from "react-bootstrap";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useAuth from "../../hooks/use-auth";
import { db } from "../../firebase/firebase.config";
import { useNavigate } from "react-router-dom";

const SelectTags = () => {
  const [canSend, setCanSend] = useState(false);
  const [names, setNames] = useState([]);

  const authData = useAuth();
  const currentUserId = authData.user.uid;
  const navigate = useNavigate();

  const len = 5;

  const send = () => {
    const document = doc(db, "users", currentUserId);
    updateDoc(document, {
      userTags: arrayUnion(...names),
    }).then(() => {
      navigate("/dashboard");
    });
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
