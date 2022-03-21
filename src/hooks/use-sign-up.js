import { useState } from "react";
import { functions } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";
import { authErrors } from "../utils/errors";

const signUpFunction = httpsCallable(functions, "signUp");

const useSignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const signUp = (email, password) => {
    setLoading(true);
    const promise = signUpFunction({ email, password });
    toast.promise(promise, {
      pending: {
        render() {
          return "Enviando petición";
        },
      },
      success: {
        render() {
          navigate(`/login`);
          return "Registro realizado con éxito";
        },
      },
      error: {
        render({ data: error }) {
          setError(error);
          setLoading(false);
          if (authErrors[error.code]) {
            return authErrors[error.code];
          }
          return "Error al registrarse";
        },
      },
    });
  };

  return [signUp, loading, error];
};

export default useSignUp;
