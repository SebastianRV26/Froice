import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = (email, password) => {
    setLoading(true);
    const promise = signInWithEmailAndPassword(auth, email, password);
    toast.promise(promise, {
      
      pending: {
        render() {
          return "Sending petition";
        },
      },
      success: {
        render() {
          navigate(`/`);
          return "Successful login";
        },
      },
      error: {
        render({ data: error }) {
          setError(error);
          setLoading(false);
          return "Login failed";
        },
      },
    });
  };

  return [login, loading, error];
};

export default useLogin;
