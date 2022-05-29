import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import CreateOpinion from "./CreateOpinion";
import WithoutData from "../../ui/WithoutData";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase.config";
import OpinionComponent from "./OpinionComponent";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import classes from "./OpinionsView.module.css";
import { useSelector } from "react-redux";
import useAuth from "../../hooks/use-auth";

const pageSize = 4;

const OpinionsView = (props) => {
  const [opinions, setOpinions] = useState([]);
  const [allOpinions, setAllOpinions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const params = useParams();
  const userData = useSelector((state) => state.user.userData);
  const authData = useAuth();
  const currentUserId = authData.user.uid;

  const opinionsType = props.type;
  const opinionsEmpty = opinions.length === 0;
  let lastDoc = useRef();
  let isLoading = useRef(false);

  const opinionsQueryOptions = useMemo(() => {
    switch (opinionsType) {
      case "home":
        return [
          collection(db, "opinions"),
          where("parent", "==", null),
          orderBy("publishedDate", "desc"),
        ];
      case "explore":
        return [
          collection(db, "opinions"),
          where("parent", "==", null),
          orderBy("publishedDate", "desc"),
          limit(pageSize),
        ];
      case "profile":
        return [
          collection(db, "opinions"),
          where("userId", "==", params.userId),
          where("parent", "==", null),
          orderBy("publishedDate", "desc"),
          limit(pageSize),
        ];
      case "comments":
        return [
          collection(db, "opinions"),
          where("parent", "==", params.parentId),
          orderBy("publishedDate", "desc"),
          limit(5),
        ];
      default:
        return null;
    }
  }, [opinionsType, params.userId]);

  const fetchOpinionsData = useCallback(async () => {
    let q;
    if (!lastDoc.current) {
      q = query(...opinionsQueryOptions);
    } else {
      q = query(...opinionsQueryOptions, startAfter(lastDoc.current));
    }
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length === 0) {
      setHasMore(false);
      return;
    }
    lastDoc.current = querySnapshot.docs[querySnapshot.docs.length - 1];
    let results = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (opinionsType === "home") {
      results = results.filter(
        (data) =>
          data.userId === currentUserId ||
          userData?.following?.includes(data.userId)
      );
      setOpinions(results.slice(0, pageSize));
      setAllOpinions(results.slice(pageSize));
    } else {
      setOpinions((opinions) => {
        return opinions.concat(results);
      });
    }
  }, [opinionsQueryOptions, userData, currentUserId, opinionsType]);

  const loadData = useCallback(() => {
    if (isLoading.current || !userData) {
      return;
    }
    isLoading.current = true;
    fetchOpinionsData().finally(() => (isLoading.current = false));
  }, [fetchOpinionsData, userData]);

  useEffect(() => {
    setOpinions([]);
    setHasMore(true);
    lastDoc.current = null;
  }, [opinionsType]);

  useEffect(() => {
    loadData();
  }, [fetchOpinionsData, loadData]);

  const onAdd = (opinionToAdd) => {
    setOpinions((opinions) => {
      return [opinionToAdd].concat(opinions);
    });
  };

  const onModify = (opinionToModify) => {
    setOpinions((opinions) => {
      return opinions.map((opinion) => {
        if (opinion.id === opinionToModify.id) {
          return opinionToModify;
        }
        return opinion;
      });
    });
  };

  const onDelete = (opinionToDelete) => {
    setOpinions((opinions) => {
      return opinions.filter((opinion) => opinion.id !== opinionToDelete.id);
    });
  };

  const loadHomeData = useCallback(() => {
    setTimeout(() => {
      setOpinions((opinions) =>
        opinions.concat(allOpinions.slice(0, pageSize))
      );
      setAllOpinions((allOpinions) => allOpinions.slice(pageSize));
      if (allOpinions <= pageSize) {
        setHasMore(false);
      }
    }, 300);
  }, [allOpinions]);

  return (
    <div className={`py-3 ${classes.container}`}>
      {opinionsType === "home" && <CreateOpinion onAdd={onAdd} />}
      {opinionsEmpty && <WithoutData />}
      <InfiniteScroll
        dataLength={opinions.length}
        next={opinionsType === "home" ? loadHomeData : loadData}
        hasMore={hasMore}
        loader={
          <div className="text-center p-2">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          </div>
        }
        endMessage={
          <p className="text-center pt-2">
            <b>Ya ha visto todas las opiniones</b>
          </p>
        }
      >
        {opinions.map((opinion) => (
          <OpinionComponent
            key={opinion.id}
            element={opinion}
            onModify={onModify}
            onDelete={onDelete}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default OpinionsView;
