import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { authErrors } from "../utils/errors";

const useLogin = () => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const login = (email, password) => {
    setLoading(true);
    const promise = signInWithEmailAndPassword(auth, email, password);
    toast.promise(promise, {
      pending: {
        render() {
          return "Enviando petición";
        },
      },
      success: {
        render() {
          return "Inicio de sesión exitoso";
        },
      },
      error: {
        render({ data: error }) {
          setError(error);
          setLoading(false);
          if (authErrors[error.code]) {
            return authErrors[error.code];
          }
          return "Error al iniciar sesión";
        },
      },
    });
  };

  return [login, loading, error];
};

export default useLogin;
