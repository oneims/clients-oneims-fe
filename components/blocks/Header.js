import React from "react";
import Container from "@/components/layouts/Container";

const Header = () => {
  return (
    <>
      <header className="BLOCK__app-header py-3 THEME__bg-app-dark">
        <Container fluid>
          <div className="BLOCK__app-header__wrapper">
            <div className="BLOCK__app-header__logo-wrapper">
              <a href="/onboardings">
                <img
                  src="https://www.oneims.com/wp-content/themes/oneims-2019/Branding/white.svg"
                  alt="OneIMS Logo Inverted"
                />
              </a>
            </div>
            <div className="BLOCK__app-header__info-wrapper">
              <div className="THEME__text-inverted THEME__font-size-0n9">
                <span className="THEME__f-600">Signed in as John Doe</span>
                <span className="">&nbsp;&nbsp;|&nbsp;&nbsp;Log out</span>
              </div>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
