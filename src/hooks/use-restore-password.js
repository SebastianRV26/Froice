import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { authErrors } from "../utils/errors";

const useRestorePassword = () => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const restorePassword = (email) => {
    setLoading(true);
    const promise = sendPasswordResetEmail(auth, email);
    toast.promise(promise, {
      pending: {
        render() {
          return "Enviando petición";
        },
      },
      success: {
        render() {
          setLoading(false);
          return "Se ha enviado un correo para el cambio de contraseña";
        },
      },
      error: {
        render({ data: error }) {
          setError(error);
          setLoading(false);
          if (authErrors[error.code]) {
            return authErrors[error.code];
          }
          return "Error al cambiar contraseña";
        },
      },
    });
  };

  return [restorePassword, loading, error];
};

export default useRestorePassword;
