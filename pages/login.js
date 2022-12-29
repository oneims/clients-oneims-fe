import React from "react";
import Button from "@/components/core/Button";
import Section from "@/components/layouts/Section";

const Login = () => {
  return (
    <>
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
                      Don't have an account? <a href="/sign-up">Sign up</a>
                    </span>
                  </div>
                </div>
                <div className="MODULE__auth-box__form-wrapper">
                  <form className="MODULE__form">
                    <div class="MODULE__form__field">
                      <label for="email">Email address</label>
                      <input type="email" tabindex="1" aria-labelledby="email" />
                    </div>
                    <div class="MODULE__form__field">
                      <label for="password">Password</label>
                      <input type="password" tabindex="1" aria-labelledby="password" />
                    </div>
                    <Button
                      wrapperClassName="mt-4 pt-3"
                      type="submit"
                      className="w-100"
                      variant="primary"
                    >
                      Log in
                    </Button>
                  </form>
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
    </>
  );
};

export default Login;
