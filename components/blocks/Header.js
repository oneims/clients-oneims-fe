import React from "react";
import Link from "next/link";
import Container from "@/components/wrappers/Container";
import { useAppContext } from "@/context/AppWrapper";
import { Schema__Generic_Variables } from "@/lib/Schema";

const Header = ({ firstName, lastName, isLoggedIn }) => {
  const { handlers } = useAppContext();
  return (
    <>
      <header className="BLOCK__app-header py-3 THEME__bg-app-dark">
        <Container fluid>
          <div className="BLOCK__app-header__wrapper">
            <div className="BLOCK__app-header__logo-wrapper">
              <Link href={`${Schema__Generic_Variables.homeUrl}`}>
                <img
                  src="https://www.oneims.com/wp-content/themes/oneims-2019/Branding/white.svg"
                  alt="OneIMS Logo Inverted"
                />
              </Link>
            </div>
            {isLoggedIn && (
              <div className="BLOCK__app-header__info-wrapper">
                <div className="THEME__text-inverted THEME__font-size-0n9">
                  <span className="THEME__f-600">
                    Signed in as {firstName} {lastName}
                  </span>
                  <span onClick={() => handlers.handleLogout()} className="THEME__cursor-pointer">
                    &nbsp;&nbsp;|&nbsp;&nbsp;Log out
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
