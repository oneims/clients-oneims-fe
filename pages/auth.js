import React, { useEffect } from "react";
import { Schema__Generic_Variables } from "@/lib/Schema";
import { setCookie } from "nookies";
import { useAppContext } from "@/context/AppWrapper";
import { useRouter } from "next/router";
import { usePasswordlessAuthGET } from "@/lib/Fetcher";
import Spinner from "@/components/core/Spinner";
import { NextSeo } from "next-seo";

const PasswordlessAuth = () => {
  const { handlers, user } = useAppContext();
  const router = useRouter();
  const { query } = router;
  const loginToken = query.loginToken;
  const { data, isLoading, isError } = usePasswordlessAuthGET(loginToken);

  if (data) {
    console.log(data);
    const jwt = data.jwt;
    const id = data.user.id;
    setCookie({ data }, "token", jwt, {
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    setCookie({ data }, "id", id, {
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    location.replace(`${Schema__Generic_Variables.loginSuccessUrl}`);
  }
  if (isError) {
    console.log(isError);
    location.replace(`${Schema__Generic_Variables.loginUrl}`);
  }

  if (!isLoading && user && user.isLoggedIn && !user.isLoading) {
    router.push(`${Schema__Generic_Variables.loginSuccessUrl}`);
  }

  useEffect(() => {
    handlers.checkAuth();
  }, []);

  return (
    <>
      <NextSeo title="Authenticate | Clients OneIMS" />
      <div className="pt-5 mt-5 THEME__generic-spinner-wrapper">
        <Spinner />
      </div>
    </>
  );
};

export default PasswordlessAuth;
