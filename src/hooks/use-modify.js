import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { authErrors } from "../utils/errors";
import { doc, updateDoc } from "firebase/firestore";

const useModify = () => {
    const [error, setError] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const useModify = (collectionName, id, object, succesText, errorText) => {
        setLoading(true);
        //tambien trate de utilizar el setDoc
        const document = doc(db, collectionName, id);
        const promise = updateDoc(document, object);
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
                console.log(error)
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

    return [useModify, loading, error];
};

export default useModify;