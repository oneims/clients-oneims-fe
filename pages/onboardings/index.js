import React from "react";
import Header from "@/components/blocks/Header";
import Main from "@/components/layouts/Main";
import Footer from "@/components/blocks/Footer";
import Section from "@/components/layouts/Section";
import Container from "@/components/layouts/Container";

const OnboardingsIndex = () => {
  return (
    <>
      <Header />
      <Main style={{ minHeight: "100vh" }}>
        <Section className="THEME__bg-primary BLOCK__default">
          <Container>
            <div className="text-center THEME__text-inverted">
              <h1 className="h1 mb-0">Onboardings</h1>
            </div>
          </Container>
        </Section>
        <Section>
          <Container>
            <div className="THEME__mw-800 mx-auto">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <div className="MODULE__track-inline-card position-relative">
                    <a
                      href="/onboardings/hubspot/lesson-one"
                      className="THEME__full-cover-anchor"
                      title="HubSpot Onboarding"
                      aria-label="HubSpot Onboarding"
                    ></a>
                    <div className="MODULE__track-inline-card__heading-wrapper">
                      <h2 className="h5 MODULE__track-inline-card__heading">HubSpot Onboarding</h2>
                    </div>
                    <div className="MODULE__track-inline-card__progress-wrapper">
                      <div className="d-flex align-items-center">
                        <div className="MODULE__track-inline-card__progress-dot MODULE__track-inline-card__progress-dot-completed"></div>
                        <div className="MODULE__track-inline-card__progress-text THEME__font-size-0n8">
                          <span>4 of 7 segments completed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </Main>
      <Footer />
    </>
  );
};

export default OnboardingsIndex;
