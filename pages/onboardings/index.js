import React from "react";
import Dashboard from "@/components/wrappers/Dashboard";
import Section from "@/components/wrappers/Section";
import Container from "@/components/wrappers/Container";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { useRouter } from "next/router";
import { useOnboardingsGET } from "@/lib/Fetcher";
import { useAppContext } from "@/context/AppWrapper";
import Spinner from "@/components/core/Spinner";

const OnboardingsIndex = () => {
  const { user } = useAppContext();
  const router = useRouter();
  let onboardings;
  const { data, isLoading, isError } = useOnboardingsGET(user?.token);
  if (data) {
    onboardings = data.data;
    console.log(onboardings);
  }
  return (
    <>
      <ProtectedRoute>
        <Dashboard>
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
                {isLoading && (
                  <div className="THEME__generic-spinner-wrapper">
                    <Spinner />
                  </div>
                )}
                {data && user.isLoggedIn && !user.isLoading && (
                  <div className="row justify-content-center">
                    {onboardings.map((elem, index) => {
                      const { attributes } = elem;
                      const segments = attributes?.segments?.data;
                      segments.sort((a, b) => {
                        return a?.attributes?.order - b?.attributes?.order;
                      });
                      const id = elem.id;
                      const title = attributes?.title;
                      const destination = `${router.asPath}/${attributes.slug}/${segments[0]?.attributes.slug}`;
                      let completedSegments = 0;
                      if (user.progress) {
                        const indexOfActiveTrack = user.progress.findIndex(
                          (elem) => elem.parentTrackId === id
                        );
                        if (
                          user.progress[indexOfActiveTrack] &&
                          user.progress[indexOfActiveTrack].segmentsCompleted.length > 0
                        ) {
                          const idsOfSegmentsInTrack = attributes?.segments?.data.map(
                            (elem) => elem.id
                          );
                          completedSegments = idsOfSegmentsInTrack.filter((elem) =>
                            user.progress[indexOfActiveTrack].segmentsCompleted.some(
                              (elem2) => elem === elem2
                            )
                          ).length;
                        }
                      }
                      const totalSegments = attributes?.segments?.data.length;
                      return (
                        <React.Fragment key={index}>
                          {attributes.segments?.data.length > 0 && (
                            <div className="col-md-6 mb-4">
                              <div className="MODULE__track-inline-card position-relative">
                                <a
                                  href={`${destination}`}
                                  className="THEME__full-cover-anchor"
                                  title="HubSpot Onboarding"
                                  aria-label="HubSpot Onboarding"
                                ></a>
                                {title && (
                                  <div className="MODULE__track-inline-card__heading-wrapper">
                                    <h2 className="h5 MODULE__track-inline-card__heading">
                                      {title}
                                    </h2>
                                  </div>
                                )}
                                <div className="MODULE__track-inline-card__progress-wrapper">
                                  <div className="d-flex align-items-center">
                                    <div
                                      className={`MODULE__track-inline-card__progress-dot ${
                                        completedSegments > 0
                                          ? `MODULE__track-inline-card__progress-dot-completed`
                                          : ``
                                      }`}
                                    ></div>
                                    <div className="MODULE__track-inline-card__progress-text THEME__font-size-0n8">
                                      <span>
                                        {completedSegments} of {totalSegments} segments completed
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                )}
              </div>
            </Container>
          </Section>
        </Dashboard>
      </ProtectedRoute>
    </>
  );
};

export default OnboardingsIndex;
