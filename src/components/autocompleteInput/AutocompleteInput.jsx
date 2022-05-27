import React from "react";
import classes from "./AutocompleteInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import Autocomplete from "react-google-autocomplete";

const AutocompleteInput = React.forwardRef((props, ref) => {
  //const [value, setValue] = useState("Null");
  //console.log(value);
  return (
    <div className={classes.AutocompleteInputContainer}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "400px",
        }}
      >
        <FontAwesomeIcon
          style={{ width: "32px", heigth: "32px", marginRight: "10px" }}
          icon={faMapLocationDot}
        />

        <Autocomplete
          apiKey={"AIzaSyD8Z3hoonVWtOTJlh-gkdBawKljnf_mq6A"}
          onPlaceSelected={(place) => {
            props.setValue(place);
          }}
          ref={ref}
          //value={props.value.formatted_address}

          debounce={1000}
        />
        
      </div>
    </div>
  );
});

export default AutocompleteInput;
