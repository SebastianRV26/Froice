import { endAt, getDocs, limit, query, startAt } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";

export const PaginationHelper = (
  dbCollection,
  myQueryOptions,
  pageSize,
  onFetchStart,
  onFetchFinish,
  onFetchError
) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

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
          ...myQueryOptions,
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
      myQueryOptions,
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

  return { list, page, showNextPage, showPreviousPage };
};
