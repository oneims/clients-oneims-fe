import React, { useState } from "react";
import Section from "@/components/wrappers/Section";
import Form from "@/components/core/Form";
import { useForm } from "react-hook-form";
import { Schema__Form__Login, Schema__Generic_Variables } from "@/lib/Schema";
import axios from "axios";
import { setCookie } from "nookies";
import { sleeper } from "@/lib/Helpers";
import ProtectedRoute from "@/lib/ProtectedRoute";
import parse from "html-react-parser";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: `all`,
  });
  const [loginUser, setLoginUser] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = (data) => {
    setLoginUser((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      identifier: data.email,
      password: data.password,
    };
    const postPayload = async () => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, payload)
        .then(sleeper(500))
        .then((res) => {
          console.log(res);
          const jwt = res.data.jwt;
          const id = res.data.user.id;
          setLoginUser((prevState) => ({
            ...prevState,
            response: res.data.data,
            isLoading: false,
          }));
          setCookie({ res }, "token", jwt, {
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
          setCookie({ res }, "id", id, {
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
          location.replace(`${Schema__Generic_Variables.loginSuccessUrl}`);
          reset();
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            setErrorMessage(err.response.data.error.message);
          }
          setLoginUser((prevState) => ({ ...prevState, isError: true, isLoading: false }));
        });
    };
    postPayload();
  };

  return (
    <>
      <ProtectedRoute type="login">
        <main>
          <Section>
            <div className="container">
              <div className="THEME__mw-400 mx-auto THEME__border-bottom-light pb-5 mb-5">
                <div className="MODULE__auth-box">
                  <div className="text-center">
                    <div className="MODULE__auth-box__logo-wrapper mb-4">
                      <img
                        src="https://www.oneims.com/wp-content/themes/oneims-2019/Branding/OneIMS-logo-fullcolor.svg"
                        alt="OneIMS Logo"
                      />
                    </div>
                    <div className="MODULE__auth-box__helper-wrapper mb-4 pb-3">
                      <span className="THEME__font-size-0n9">
                        {parse(`Don't have an account? <a href="/sign-up">Sign up</a>`)}
                      </span>
                    </div>
                  </div>
                  <div className="MODULE__auth-box__form-wrapper">
                    <Form
                      onSubmit={handleSubmit(onSubmit)}
                      register={register}
                      schema={Schema__Form__Login}
                      errors={errors}
                      isDirty={isDirty}
                      isValid={isValid}
                      isLoading={loginUser.isLoading}
                      errorMessage={errorMessage}
                    />
                  </div>
                </div>
              </div>
              <div className="THEME__mw-400 mx-auto text-center">
                <span className="THEME__font-size-0n8">
                  ©{new Date().getFullYear()} OneIMS. All Rights Reserved.
                </span>
              </div>
            </div>
          </Section>
        </main>
      </ProtectedRoute>
    </>
  );
};

export default Login;
