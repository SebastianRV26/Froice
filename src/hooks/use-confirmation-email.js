import { useCallback, useState } from "react";
import { sendEmailVerification } from "firebase/auth";

const useConfirmationEmail = () => {
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const sendConfirmationEmail = useCallback(async (user) => {
    if (user.emailVerified) {
      return;
    }
    setLoading(true);
    try {
      await sendEmailVerification(user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return [sendConfirmationEmail, loading, error];
};

export default useConfirmationEmail;
