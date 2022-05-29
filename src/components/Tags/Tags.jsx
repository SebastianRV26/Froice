import { map } from "@firebase/util";
import React, { useState } from "react";
import { Badge, Button, ButtonGroup, ToggleButton } from "react-bootstrap";

const Tag = (props) => {
    const [checked, setChecked] = useState(false);
    return (
        <div>
            <ToggleButton
                className="mb-2"
                id={props.name}
                type="checkbox"
                variant="outline-primary"
                checked={checked}
                onChange={(e) => setChecked(e.currentTarget.checked)}
                onClick={props.click}
            >
            </ToggleButton>
            &nbsp;
            <Badge bg="danger">{props.name}</Badge>
        </div>

    );
};

export default Tag;