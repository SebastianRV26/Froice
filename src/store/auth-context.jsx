import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";

export const FirebaseAuthContext = createContext(undefined);

const FirebaseAuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    user: JSON.parse(localStorage.getItem("user")),
    role: localStorage.getItem("role"),
    cache: true,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      let role;
      if (user) {
        role = (await user.getIdTokenResult()).claims.role;
        role = role===undefined ? 'user': role;
      } else {
        role = 'user';
      }
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);
      setAuthData({ user: user, role: role, cache: false });
    });
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={authData}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export default FirebaseAuthProvider;
