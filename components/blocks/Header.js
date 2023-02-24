import React from "react";
import Container from "@/components/wrappers/Container";
import { useAppContext } from "@/context/AppWrapper";
import { Schema__Generic_Variables } from "@/lib/Schema";

const Header = ({ firstName, lastName, email, isLoggedIn, organization }) => {
  const { handlers } = useAppContext();
  return (
    <>
      <header className="BLOCK__app-header py-3 THEME__bg-app-dark">
        <Container fluid>
          <div className="BLOCK__app-header__wrapper">
            <div className="BLOCK__app-header__logo-wrapper">
              <a href={`${Schema__Generic_Variables.homeUrl}`}>
                <img src="/white.svg" alt="OneIMS Logo Inverted" />
              </a>
            </div>
            {isLoggedIn && (
              <div className="BLOCK__app-header__info-wrapper">
                <div className="THEME__text-inverted THEME__font-size-0n9">
                  <span className="THEME__f-600 MODULE__signed-in-as">
                    Signed in as {email}{" "}
                    {organization ? (
                      <div className="MODULE__organization-label d-inline">{organization}</div>
                    ) : (
                      ``
                    )}
                    <span className="THEME__f-400">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                  </span>
                  <span onClick={() => handlers.handleLogout()} className="THEME__cursor-pointer">
                    Log out
                  </span>
                </div>
              </div>
            )}
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
