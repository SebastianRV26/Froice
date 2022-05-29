import React, { useState } from "react";
import { Badge, ToggleButton } from "react-bootstrap";
import classes from "./Tags.module.css";

const Tag = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="d-inline-block mx-1">
      <ToggleButton
        className={`mx-1 ${classes.alignMiddle}`}
        id={props.name}
        type="checkbox"
        variant="outline-primary"
        checked={checked}
        onChange={(e) => {
          setChecked(e.currentTarget.checked);
          props.onChange(e.currentTarget.checked);
        }}
      ></ToggleButton>
      <Badge bg="danger" className={classes.alignMiddle}>
        {props.name}
      </Badge>
    </div>
  );
};

export default Tag;
