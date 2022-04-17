import { orderBy, where } from "firebase/firestore";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { capitalizeFirstLetter } from "../../utils/utils";
import TableComponent from "../Table/TableComponent";
import classes from "./TableFilter.module.css";

const TableFilter = (props) => {
  const filters = props.columns.filter((colData) => colData.filter);

  const [filterType, setFilterType] = useState(filters[0].key);
  const [filterText, setFilterText] = useState("");
  const [queryOptions, setQueryOptions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (filterText === "") {
      setQueryOptions([orderBy(filters[0].key)]);
    } else {
      setQueryOptions([
        orderBy(filterType),
        where(filterType, ">=", capitalizeFirstLetter(filterText)),
        where(filterType, "<=", capitalizeFirstLetter(filterText) + "\uf8ff"),
      ]);
    }
  };

  return (
    <div className="container">
      <div className={classes.titleContainer}>
        <h3 className="text-center my-4">{props.title}</h3>
        <Button onClick={props.button} className={classes.actionBtn}>
          <i className="fas fa-plus"></i>
        </Button>
      </div>
      <Form className="row" onSubmit={handleSubmit}>
        <Form.Group className="mb-3 col-md">
          <Form.Label>Seleccione el tipo de filtro</Form.Label>
          <Form.Select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            {filters.map((filter) => (
              <option key={filter.key} value={filter.key}>
                {filter.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3 col-md" controlId="formBasicEmail">
          <Form.Label>Ingrese el dato a buscar</Form.Label>
          <span className="fas fa-search p-2 input-icon"></span>
          <Form.Control
            className="input-spacing"
            type="text"
            placeholder="Filtro"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </Form.Group>
      </Form>
      <TableComponent
        columns={props.columns}
        collection={props.collection}
        queryOptions={queryOptions}
        onModify={props.onModify}
        onDelete={props.onDelete}
      />
    </div>
  );
};

export default TableFilter;
