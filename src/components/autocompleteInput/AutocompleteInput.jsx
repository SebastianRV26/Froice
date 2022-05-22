import { useState } from "react";
import classes from "./AutocompleteInput.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

const AutocompleteInput = (props) => {
  let places = [
    "San José",
    "Alajuela",
    "Cartago",
    "Heredia",
    "Guanacaste",
    "Puntarenas",
    "Limón",
    "Central",
    "Escazú",
    "Desamparados",
    "Puriscal",
    "Tarrazú",
    "Aserrí",
    "Mora",
    "Goicoechea",
    "Santa Ana",
    "Alajuelita",
    "Vázquez De Coronado",
    "Acosta",
    "Tibás",
    "Moravia",
    "Montes De Oca",
    "Turrubares",
    "Dota",
    "Curridabat",
    "Pérez Zeledón",
    "León Cortés Castro",
    "Central",
    "San Ramón",
    "Grecia",
    "San Mateo",
    "Atenas",
    "Naranjo",
    "Palmares",
    "Poás",
    "Orotina",
    "San Carlos",
    "Zarcero",
    "Sarchí",
    "Upala",
    "Los Chiles",
    "Guatuso",
    "Río Cuarto",
    "Central",
    "Paraíso",
    "La Unión",
    "Jiménez",
    "Turrialba",
    "Alvarado",
    "Oreamuno",
    "El Guarco",
    "Central",
    "Barva",
    "Santo Domingo",
    "Santa Barbara",
    "San Rafael",
    "San Isidro",
    "Belén",
    "Flores",
    "San Pablo",
    "Sarapiquí",
    "Liberia",
    "Nicoya",
    "Santa Cruz",
    "Bagaces",
    "Carrillo",
    "Cañas",
    "Abangares",
    "Tilarán",
    "Nandayure",
    "La Cruz",
    "Hojancha",
    "Central",
    "Esparza",
    "Buenos Aires",
    "Montes De Oro",
    "Osa",
    "Quepos",
    "Golfito",
    "Coto Brus",
    "Parrita",
    "Corredores",
    "Garabito",
    "Central",
    "Pococí",
    "Siquirres",
    "Talamanca",
    "Matina",
    "Guácimo",
  ];

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [input, setInput] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  const onChange = (e) => {
    const userInput = e.target.value;
    const unLinked = places.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e) => {
    setSelectedPlace(e.target.innerText);
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);

    
    console.log(e.target.innerText);
    console.log(selectedPlace);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setInput(filteredSuggestions[activeSuggestionIndex]);
      setActiveSuggestionIndex(0);
      setShowSuggestions(false);
      console.log(selectedPlace);
    } else if (e.keyCode === 38) {
      if (activeSuggestionIndex === 0) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestionIndex - 1 === filteredSuggestions.length) {
        return;
      }
      setActiveSuggestionIndex(activeSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    
    return filteredSuggestions.length ? (
      <ul className={classes.suggestions}>
        {filteredSuggestions.map((suggestion, index) => {
          let className;

          if (index === activeSuggestionIndex) {
            className = classes.suggestionsActive;
          }

          return (
            <li className={className} key={suggestion+" "+index} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
        <div className={classes.noSuggestions}>
            <em>No suggestions</em>
        </div>
    );
  };

  return (
    <div className={classes.AutocompleteInputContainer}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "200px",
        }}
      >
        <FontAwesomeIcon
          style={{ width: "32px", heigth: "32px", marginRight: "10px" }}
          icon={faMapLocationDot}
        />

        <input
          className={classes.pinput}
          type="text"
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={input}
        />
      </div>
      {(showSuggestions) && <SuggestionsListComponent />}
    </div>
  );
};

export default AutocompleteInput;
