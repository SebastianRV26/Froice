import { endAt, getDocs, limit, query, startAt } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import classes from "./TableComponent.module.css";
import Placeholder from "react-bootstrap/Placeholder";
import sadFace from "../../assets/sad-face.svg";
import Image from "react-bootstrap/Image";

const TableComponent = (props) => {
  const pageSize = 2;
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const previousDisabled = page === 1;
  const nextDisabled = list.length <= pageSize;

  const dbCollection = props.collection;
  const actions = props.actions;

  const fetchData = useCallback(
    async (queryOptions = []) => {
      setLoading(true);
      try {
        const q = query(
          dbCollection,
          limit(pageSize + 1),
          ...props.queryOptions,
          ...queryOptions
        );
        const querySnapshot = await getDocs(q);
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setList(items);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [dbCollection, props.queryOptions]
  );

  useEffect(() => {
    fetchData();
    setPage(1);
  }, [fetchData]);

  const showNextPage = () => {
    fetchData([startAt(list[list.length - 1])]);
    setPage((page) => page + 1);
  };

  const showPreviousPage = () => {
    fetchData([endAt(list[0])]);
    setPage((page) => page - 1);
  };

  const renderRows = () => {
    return list.slice(0, pageSize).map((data) => (
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

  if (!loading && list.length === 0) {
    return (
      <div className={classes.empty}>
        <Image src={sadFace} alt="Cara triste" />
        <h2>No se ha encontrado ningún resultado</h2>
        <p>Pruebe agregar datos o ajustar el filtro de búsqueda</p>
      </div>
    );
  }

  return (
    <>
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
      <Pagination className={classes.pagination}>
        <Pagination.Prev
          disabled={previousDisabled}
          onClick={showPreviousPage}
        />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next disabled={nextDisabled} onClick={showNextPage} />
      </Pagination>
    </>
  );
};

export default TableComponent;
