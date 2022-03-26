import { useState } from "react";
import { db } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { authErrors } from "../utils/errors";
import { deleteDoc, doc } from "firebase/firestore";

const useDelete = () => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const useDelete = (collectionName, id, succesText, errorText) => {
    setLoading(true);
    //tambien trate de utilizar el setDoc
    const promise = deleteDoc(doc(db, collectionName, id));
    toast.promise(promise, {
      pending: {
        render() {
          return "Enviando petición";
        },
      },
      success: {
        render() {
          return succesText;
        },
      },
      error: {
        render({ data: error }) {
          console.log(error);
          setError(error);
          setLoading(false);
          if (authErrors[error.code]) {
            return authErrors[error.code];
          }
          return errorText;
        },
      },
    });
  };

  return [useDelete, loading, error];
};

export default useDelete;
