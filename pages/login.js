import React, { useState } from "react";
import Section from "@/components/wrappers/Section";
import Form from "@/components/core/Form";
import { useForm } from "react-hook-form";
import { Schema__Form__Login } from "@/lib/Schema";
import axios from "axios";
import { sleeper } from "@/lib/Helpers";
import ProtectedRoute from "@/lib/ProtectedRoute";
import parse from "html-react-parser";
import { useAppContext } from "@/context/AppWrapper";
import { NextSeo } from "next-seo";

const Login = () => {
  const { user } = useAppContext();
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
  const [successMessage, setSuccessMessage] = useState(null);

  const onSubmit = (data) => {
    setLoginUser((prevState) => ({ ...prevState, isLoading: true }));
    const payload = {
      email: data.email,
    };
    const postPayload = async () => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/passwordless/send-link`, payload)
        .then(sleeper(500))
        .then((res) => {
          console.log(res);
          setSuccessMessage(`We just emailed you a login link. Please login using that link.`);
          setLoginUser((prevState) => ({ ...prevState, isLoading: false }));
          reset();
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            setErrorMessage(`Oops. Something went wrong.`);
            setLoginUser((prevState) => ({ ...prevState, isLoading: false }));
          }
        });
    };
    postPayload();
  };

  return (
    <>
      <NextSeo title="Login | Clients OneIMS" />
      <ProtectedRoute type="login">
        {!user.isLoading && (
          <main>
            <Section>
              <div className="container">
                <div className="THEME__mw-400 mx-auto THEME__border-bottom-light pb-5 mb-5">
                  <div className="MODULE__auth-box">
                    <div className="text-center">
                      <div className="MODULE__auth-box__logo-wrapper mb-4">
                        <img src="/OneIMS-logo-fullcolor.svg" alt="OneIMS Logo" />
                      </div>
                      <div className="MODULE__auth-box__helper-wrapper mb-4 pb-3">
                        <span className="THEME__font-size-0n9">
                          {parse(`Enter your email address to get started`)}
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
                        successMessage={successMessage}
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
        )}
      </ProtectedRoute>
    </>
  );
};

export default Login;
