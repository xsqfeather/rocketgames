import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SnackbarContext } from "../contexts/SnackbarContext";

export default function useLogin() {
  const [submitting, setSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");
  const time = searchParams.get("time");
  const logout = searchParams.get("logout");

  const { showNotify } = useContext(SnackbarContext);

  useEffect(() => {
    if (error) {
      setSubmitting(false);
      showNotify({
        color: "danger",
        message: "First name or Email error! 🤥",
      });
    }
  }, [error, time]);

  useEffect(() => {
    if (logout) {
      setSubmitting(false);
      showNotify({
        message: "You're logout safely! 🤥",
      });
    }
  }, [logout]);

  return {
    submitting,
    setSubmitting,
  };
}
