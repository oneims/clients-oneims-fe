import React from "react";
import Header from "@/components/blocks/Header";
import Main from "@/components/wrappers/Main";
import Button from "@/components/core/Button";
import Footer from "@/components/blocks/Footer";
import Section from "@/components/wrappers/Section";
import Container from "@/components/wrappers/Container";
import parse from "html-react-parser";
import { useAppContext } from "@/context/AppWrapper";
import ProtectedRoute from "@/lib/ProtectedRoute";
import Dashboard from "@/components/wrappers/Dashboard";

const Segment = () => {
  const { user } = useAppContext();
  return (
    <>
      <ProtectedRoute>
        <Dashboard segmentView>
          <Section className="py-3 THEME__border-bottom-light">
            <Container fluid>
              <div className="text-start">
                <h1 className="h4 mb-0 THEME__f-600">HubSpot Onboarding</h1>
                <p className="mb-0 THEME__font-size-0n9">Why is Lead Management Important?</p>
              </div>
            </Container>
          </Section>
          <Section className="BLOCK__segment-view">
            <div className="BLOCK__segment-view__wrapper">
              <div className="BLOCK__segment-view__column BLOCK__segment-view__column-left">
                <div className="MODULE__segment-sidebar">
                  <div className="MODULE__segment-sidebar__item MODULE__segment-sidebar__item-active">
                    <div className="MODULE__segment-sidebar__item__row">
                      <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-left">
                        <div className="MODULE__segment-sidebar__item__progress-circle MODULE__segment-sidebar__item__progress-circle-completed"></div>
                      </div>
                      <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-right">
                        <h2 className="MODULE__segment-sidebar__item__heading h7 mb-0 THEME__f-600">
                          Introduction to Lead Management
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="MODULE__segment-sidebar__item MODULE__segment-sidebar__item">
                    <div className="MODULE__segment-sidebar__item__row">
                      <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-left">
                        <div className="MODULE__segment-sidebar__item__progress-circle"></div>
                      </div>
                      <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-right">
                        <h2 className="MODULE__segment-sidebar__item__heading h7 mb-0 THEME__f-600">
                          How Marketing Can Organize and Segment Their Leads 8 minutes
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="MODULE__segment-sidebar__item MODULE__segment-sidebar__item">
                    <div className="MODULE__segment-sidebar__item__row">
                      <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-left">
                        <div className="MODULE__segment-sidebar__item__progress-circle"></div>
                      </div>
                      <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-right">
                        <h2 className="MODULE__segment-sidebar__item__heading h7 mb-0 THEME__f-600">
                          Identifying Your Lead Management Success Metrics
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="MODULE__segment-sidebar__item MODULE__segment-sidebar__item">
                    <div className="MODULE__segment-sidebar__item__row">
                      <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-left">
                        <div className="MODULE__segment-sidebar__item__progress-circle"></div>
                      </div>
                      <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-right">
                        <h2 className="MODULE__segment-sidebar__item__heading h7 mb-0 THEME__f-600">
                          How to Report Lead Management Results
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="MODULE__segment-sidebar__item MODULE__segment-sidebar__item">
                    <div className="MODULE__segment-sidebar__item__row">
                      <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-left">
                        <div className="MODULE__segment-sidebar__item__progress-circle"></div>
                      </div>
                      <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-right">
                        <h2 className="MODULE__segment-sidebar__item__heading h7 mb-0 THEME__f-600">
                          How to Create Lead Management Reports in HubSpot
                        </h2>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className="MODULE__segment-sidebar__item MODULE__segment-sidebar__item">
                    <div className="MODULE__segment-sidebar__item__row">
                      {/* <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-left">
                        <div className="MODULE__segment-sidebar__item__progress-circle"></div>
                      </div> */}
                      <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-right">
                        <h2 className="MODULE__segment-sidebar__item__heading h7 mb-0 THEME__f-600">
                          Complete this track
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="BLOCK__segment-view__column BLOCK__segment-view__column-right">
                <div className="THEME__mw-700 mx-auto BLOCK__medium px-4">
                  <div className="BLOCK__segment-view__body pb-md-5">
                    <div className="MODULE__article-content MODULE__article-content-smaller-headings">
                      {parse(`<h2>Lesson overview</h2>
                      <p>
                        If you ask different organizations to define lead management, you'll likely
                        hear varying definitions. Lead management will vary depending on how they
                        define a lead, how their company operates, and what their current goals are.
                        However, every professional agrees that lead management is crucial for any
                        scaling business. In this lesson, you'll learn why lead management is
                        important, the fundamentals of all lead management processes, and what lead
                        management looks like.
                      </p>
                      <p>
                        Creating a lead management strategy can feel complicated, especially when
                        you're managing several leads in different stages of their buyer's journey.
                        To get the most complete picture of how your leads move, you'll need support
                        from both marketing and sales to develop an effective lead management
                        strategy. In this lesson, you'll learn how to create an effective lead
                        management strategy by aligning your marketing and sales teams.
                      </p>
                      <h2>What Does Lead Management Look Like?</h2>
                      <p>
                        To ensure you're managing and engaging with your leads effectively, you'll
                        need to start by organizing your leads with segmentation and lead
                        qualification. Whether you're in marketing or sales, HubSpot has the tools
                        to make segmenting and qualifying your leads feel seamless. In this lesson,
                        you'll learn how to segment and qualify your leads with HubSpot.
                      </p>`)}
                    </div>
                    <div className="BLOCK__segment-view__questionnaire pt-5 mt-5 THEME__border-top-light">
                      <form className="MODULE__form">
                        <div class="MODULE__form__grouped-fields MODULE__form__grouped-fields-two-col">
                          <div class="MODULE__form__field">
                            <label for="firstName">Company size</label>
                            <input type="text" tabindex="1" aria-labelledby="firstName" />
                          </div>
                          <div class="MODULE__form__field">
                            <label for="lastName">Number of employees</label>
                            <input type="text" tabindex="1" aria-labelledby="lastName" />
                          </div>
                        </div>
                        <div class="MODULE__form__grouped-fields MODULE__form__grouped-fields-two-col">
                          <div class="MODULE__form__field">
                            <label for="firstName">Industry</label>
                            <input type="text" tabindex="1" aria-labelledby="firstName" />
                          </div>
                          <div class="MODULE__form__field">
                            <label for="lastName">Objectives</label>
                            <input type="text" tabindex="1" aria-labelledby="lastName" />
                          </div>
                        </div>
                        <Button wrapperClassName="mt-4 pt-3" type="submit" variant="tertiary">
                          Save my progress
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </Dashboard>
      </ProtectedRoute>
    </>
  );
};

export default Segment;
