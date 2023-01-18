import React from "react";
import Dashboard from "@/components/wrappers/Dashboard";
import Section from "@/components/wrappers/Section";
import Container from "@/components/wrappers/Container";

const Custom404 = () => {
  return (
    <Dashboard>
      <Section className="BLOCK__large">
        <Container>
          <div className="text-center">
            <h1 className="THEME__super-large-heading mb-0">
              <span className="THEME__text-primary">404.</span> Not Found.
            </h1>
          </div>
        </Container>
      </Section>
    </Dashboard>
  );
};

export default Custom404;
