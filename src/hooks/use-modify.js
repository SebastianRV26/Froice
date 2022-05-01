import { useState } from "react";
import { db } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

const useModify = () => {
  const [loading, setLoading] = useState(false);

  const useModify = (collectionName, id, object, succesText, errorText) => {
    setLoading(true);
    const document = doc(db, collectionName, id);
    const promise = updateDoc(document, object).finally(() =>
      setLoading(false)
    );
    return toast.promise(promise, {
      pending: "Enviando petición",
      success: succesText,
      error: errorText,
    });
  };

  return [useModify, loading];
};

export default useModify;
