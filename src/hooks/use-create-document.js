import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { authErrors } from "../utils/errors";
import { getFirestore } from 'firebase/firestore'

const useCreateDocument = () => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const useCreateDocument = (collectionName, name, object) => {
    setLoading(true);
    //tambien trate de utilizar el setDoc
    console.log(collectionName, name, object);
    const promise = addDoc(collection(db, collectionName), object);

    toast.promise(promise, {
      pending: {
        render() {
          return "Enviando petición";
        },
      },
      success: {
        render() {
          return `${name} agregado exitosamente`;
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
          return `Error al crear el ${name}`;
        },
      },
    });
  };

  return [useCreateDocument, loading, error];
};

export default useCreateDocument;
