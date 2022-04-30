import { endAt, getDocs, limit, query, startAt } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";

export const PaginationHelper = (dbCollection, myQueryOptions, pageSize) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  //const enableModify = props.onModify !== undefined;
  //const enableDelete = props.onDelete !== undefined;

  const fetchData = useCallback(
    async (queryOptions = []) => {
      setLoading(true);
      try {
        console.log("Cambió");
        const q = query(
          dbCollection,
          limit(pageSize + 1),
          ...myQueryOptions,
          ...queryOptions
        );
        const querySnapshot = await getDocs(q);
        let items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setList(items);
      } catch (error) {
        console.log("GG");
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [dbCollection, myQueryOptions]
  );

  useEffect(() => {
    fetchData();
    setPage(1);
  }, [myQueryOptions/*fetchData*/]); //myQueryOptions

  const showNextPage = () => {
    fetchData([startAt(list[list.length - 1])]);
    setPage((page) => page + 1);
  };

  const showPreviousPage = () => {
    fetchData([endAt(list[0])]);
    setPage((page) => page - 1);
  };

  return { list, page, showNextPage, showPreviousPage };
};
