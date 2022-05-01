import { endAt, getDocs, limit, query, startAt } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import classes from "./TableComponent.module.css";
import Placeholder from "react-bootstrap/Placeholder";
import sadFace from "../../assets/sad-face.svg";
import Image from "react-bootstrap/Image";
import FirestorePagination from "../FirestorePagination/FirestorePagination";

const TableComponent = (props) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const actions = props.actions;

  const onFetchStart = useCallback(() => {
    setLoading(true);
  }, []);

  const onFetchFinish = useCallback((list) => {
    setList(list);
    setLoading(false);
  }, []);

  const onFetchError = useCallback((error) => {
    setLoading(false);
    console.log(error);
  }, []);

  const renderRows = () => {
    return list.map((data) => (
      <tr key={data.id}>
        {props.columns.map((colData) => (
          <td key={colData.key} data-label={colData.label}>
            {colData.render
              ? colData.render(data[colData.key])
              : data[colData.key]}
          </td>
        ))}
        {actions && (
          <td data-label="Accciones">
            {actions.map((action) => (
              <Button
                key={action.key}
                className={`${classes.btnAction} p-2 icon mx-1`}
                onClick={action.actionHandler.bind(null, data)}
              >
                <img src={action.icon}></img>
              </Button>
            ))}
          </td>
        )}
      </tr>
    ));
  };

  const renderLoadingRows = () => {
    let rows = [];

    for (let i = 0; i < 5; i++) {
      rows.push(
        <tr key={i}>
          {props.columns.map((colData) => (
            <td key={colData.key} data-label={colData.label}>
              <Placeholder animation="glow">
                <Placeholder xs={4} />
              </Placeholder>
            </td>
          ))}
          {actions && (
            <td data-label="Accciones">
              {actions.map((action) => (
                <Placeholder.Button
                  key={action.key}
                  className={classes.btnAction}
                />
              ))}
            </td>
          )}
        </tr>
      );
    }

    return rows;
  };

  return (
    <>
      {(loading || (!loading && list.length > 0)) && (
        <table>
          <thead>
            <tr>
              {props.columns.map((colData) => (
                <th key={colData.key}>{colData.label}</th>
              ))}
              {actions && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {!loading && renderRows()}
            {loading && renderLoadingRows()}
          </tbody>
        </table>
      )}
      {!loading && list.length === 0 && (
        <div className={classes.empty}>
          <Image src={sadFace} alt="Cara triste" />
          <h2>No se ha encontrado ningún resultado</h2>
          <p>Pruebe agregar datos o ajustar el filtro de búsqueda</p>
        </div>
      )}
      <FirestorePagination
        pageSize={5}
        collection={props.collection}
        queryOptions={props.queryOptions}
        onFetchStart={onFetchStart}
        onFetchFinish={onFetchFinish}
        onFetchError={onFetchError}
      ></FirestorePagination>
    </>
  );
};

export default TableComponent;
