import React, { useState } from "react";
import { Button, Card, Image } from "react-bootstrap";
import classes from "./NewOpinion.module.css";
import user from "../../../assets/icons/user.png";

const NewOpinion = (props) => {
  const [message, setMessage] = useState(props.message);

  const send = (message) => {
    if (message !== "" && message !== props.message) {
      props.onSend(message);
    }
    setMessage("");
  };

  return (
    <Card className={classes.myrow}>
      <Card.Body>
        <div className={classes.container}>
          <Image src={user} roundedCircle className={classes.image} />
          <textarea
            placeholder="Realizar nueva queja"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={classes.ta}
          />
        </div>
        <div>
          <Button variant="secondary">Attach</Button>
          <Button onClick={()=>{send(message)}} variant="primary" className={classes.send}>
            Send
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NewOpinion;
