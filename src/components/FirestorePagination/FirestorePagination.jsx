import { endAt, getDocs, limit, query, startAt } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import classes from "./FirestorePagination.css";

const FirestorePagination = (props) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const pageSize = props.pageSize;
  const previousDisabled = page === 1;
  const nextDisabled = list.length <= pageSize;
  const dbCollection = props.collection;
  const onFetchStart = props.onFetchStart;
  const onFetchFinish = props.onFetchFinish;
  const onFetchError = props.onFetchError;

  let firstDoc = useRef();
  let lastDoc = useRef();
  let firstPage = useRef(page === 1);

  const fetchData = useCallback(
    async (queryOptions = [], action = undefined) => {
      onFetchStart();
      try {
        const q = query(
          dbCollection,
          limit(pageSize + 1),
          ...props.queryOptions,
          ...queryOptions
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length === 0 && !firstPage.current) {
          setPage(1);
          fetchData();
        } else {
          firstDoc.current = querySnapshot.docs[0];
          lastDoc.current = querySnapshot.docs[querySnapshot.docs.length - 1];
          let items = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });
          setList(items);
          if (action === "next") {
            setPage((page) => page + 1);
          } else if (action === "previous") {
            setPage((page) => page - 1);
          }
          onFetchFinish(items.slice(0, pageSize));
        }
      } catch (error) {
        onFetchError(error);
      }
    },
    [
      dbCollection,
      props.queryOptions,
      pageSize,
      onFetchStart,
      onFetchFinish,
      onFetchError,
    ]
  );

  useEffect(() => {
    setPage(1);
    fetchData();
  }, [fetchData]);

  const showNextPage = () => {
    fetchData([startAt(lastDoc.current)], "next");
  };

  const showPreviousPage = () => {
    fetchData([endAt(firstDoc.current)], "previous");
  };

  return (
    <Pagination className={classes.pagination}>
      <Pagination.Prev disabled={previousDisabled} onClick={showPreviousPage} />
      <Pagination.Item active>{page}</Pagination.Item>
      <Pagination.Next disabled={nextDisabled} onClick={showNextPage} />
    </Pagination>
  );
};

export default FirestorePagination;
