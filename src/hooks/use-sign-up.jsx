import { useState } from "react";
import { functions } from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { httpsCallable } from "firebase/functions";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useConfirmationEmail from "./use-confirmation-email";
const signUpFunction = httpsCallable(functions, "signUp");

const useSignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [sendConfirmationEmail] = useConfirmationEmail();

  let handleOnSucess = async (email,password) => {
    await signInWithEmailAndPassword(auth, email, password);
    await sendConfirmationEmail(auth.currentUser);
    navigate(`/registerConfirmation`);
  } 

  const signUp = (email, password,firstName, lastName,phone) => {
    setLoading(true);
    
    const promise = signUpFunction({email,password,firstName,lastName,phone});
    toast.promise(promise,{
      pending: {
        render() {
          return "Sending petition";
        },
      },
      success: {
        render() {
          handleOnSucess(email,password);
          return "Success registered";
        },
      },
      error: {
        render({ data: error }) {
          setError(error);
          setLoading(false);
          /*
          if (authErrors[error.code]) {
            return authErrors[error.code];
          }
          */
          return "Register error";
        },
      },
    });
  };

  return [signUp, loading, error];
};

export default useSignUp;


