import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppWrapper";
import { Schema__Generic_Variables } from "@/lib/Schema";

const ProtectedRoute = ({ children, type }) => {
  const { handlers, user } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    handlers.checkAuth();
  }, []);
  if (type === "login") {
    if (user && user.isLoggedIn && !user.isLoading) {
      router.push(`${Schema__Generic_Variables.loginSuccessUrl}`);
    }
  } else {
    if (user && !user.isLoggedIn && !user.isLoading) {
      router.push("/login");
    }
  }
  if (!user.isLoading) {
    return children;
  }
};

export default ProtectedRoute;
