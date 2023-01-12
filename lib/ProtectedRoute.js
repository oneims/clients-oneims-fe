import React, { useEffect } from "react";
import { useAppContext } from "@/context/AppWrapper";
import { Schema__Generic_Variables } from "@/lib/Schema";

const ProtectRoute = ({ children, type }) => {
  const { handlers, user } = useAppContext();
  useEffect(() => {
    handlers.checkAuth();
  }, []);
  if (type === "login") {
    if (user && user.isLoggedIn && !user.isLoading) {
      if (typeof window !== "undefined") {
        location.replace(`${Schema__Generic_Variables.loginSuccessUrl}`);
      }
    }
  } else {
    if (user && !user.isLoggedIn && !user.isLoading) {
      if (typeof window !== "undefined") {
        location.replace(`/login`);
      }
    }
  }
  return children;
};

export default ProtectRoute;
