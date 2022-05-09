import { useState } from "react";
import { db } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";

const useDelete = () => {
  const [loading, setLoading] = useState(false);

  const useDelete = (collectionName, id, succesText, errorText) => {
    setLoading(true);
    const promise = deleteDoc(doc(db, collectionName, id)).finally(() =>
      setLoading(false)
    );
    return toast.promise(promise, {
      pending: "Enviando petición",
      success: succesText,
      error: errorText,
    });
  };

  return [useDelete, loading];
};

export default useDelete;
