import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import Section from "@/components/wrappers/Section";
import Container from "@/components/wrappers/Container";
import { useAppContext } from "@/context/AppWrapper";
import ProtectedRoute from "@/lib/ProtectedRoute";
import Dashboard from "@/components/wrappers/Dashboard";
import Spinner from "@/components/core/Spinner";
import ReactMarkdown from "react-markdown";
import Form from "@/components/core/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Script from "next/script";

const Segment = ({
  isLoading,
  asPath,
  trackTypeSlug,
  parentTrackSlug,
  parentTrackTitle,
  segmentTitle,
  segmentSlug,
  navigation,
  pageContent,
  activeSegmentId,
  parentTrackId,
}) => {
  const { handlers, user } = useAppContext();
  const [progressIndexOfActiveTrack, setProgressIndexOfActiveTrack] = useState(null);
  const [progressIndexOfActiveSegment, setProgressIndexOfActiveSegment] = useState(null);
  const [trackAlreadyInProgress, setTrackAlreadyInProgress] = useState(false);
  const [wistiaLoaded, setWistiaLoaded] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: `all`,
  });

  const [submitForm, setSubmitForm] = useState({
    response: null,
    isLoading: false,
    isError: null,
  });

  let trackProgress;

  const onSubmit = (data) => {
    if (user.progress) {
      const { progress } = user;
      let updatedProgress = JSON.parse(JSON.stringify(progress));
      updatedProgress[progressIndexOfActiveTrack].segments[
        progressIndexOfActiveSegment
      ].formFields = data;
      if (
        !updatedProgress[progressIndexOfActiveTrack].segmentsCompleted.includes(activeSegmentId)
      ) {
        updatedProgress[progressIndexOfActiveTrack].segmentsCompleted.push(activeSegmentId);
      }
      if (
        updatedProgress[progressIndexOfActiveTrack].segmentsCompleted.length ===
        updatedProgress[progressIndexOfActiveTrack].segments.length
      ) {
        updatedProgress[progressIndexOfActiveTrack].readyToSubmit = true;
      }
      console.log(`MY PROGRESS:`, progress);
      // **Form Submission Starts Below
      const postProgress = async () => {
        setSubmitForm((prevState) => ({ ...prevState, isLoading: true }));
        const payload = {
          progress: updatedProgress,
        };
        await axios
          .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, payload, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((res) => {
            toast.success("Progress saved successfully!");
            console.log(res);
            setSubmitForm((prevState) => ({ ...prevState, isLoading: false }));
            handlers.mutateUser({
              progress: updatedProgress,
            });
          })
          .catch((err) => {
            console.log(err);
            toast.error("Something went wrong! Please try again");
            setSubmitForm((prevState) => ({ ...prevState, isLoading: false, isError: true }));
          });
      };
      postProgress();
    }
  };

  const updateIndexOfActiveTrackAndSegment = () => {
    if (!isLoading && !user.loading && trackAlreadyInProgress) {
      const indexOfActiveTrack = user.progress.findIndex(
        (elem) => elem.parentTrackId === parentTrackId
      );
      const indexOfActiveSegment = user.progress[indexOfActiveTrack].segments.findIndex((elem) => {
        return elem.id === activeSegmentId;
      });
      setProgressIndexOfActiveTrack(indexOfActiveTrack);
      setProgressIndexOfActiveSegment(indexOfActiveSegment);
    }
  };

  const updateInitialTrackProgress = () => {
    if (navigation && !user.isLoading) {
      trackProgress = {
        trackType: trackTypeSlug,
        parentTrackTitle,
        parentTrackId,
        parentTrackSlug,
        segmentsCompleted: [],
        readyToSubmit: false,
      };
      let segments = [];
      navigation.forEach((elem) => {
        const { attributes } = elem;
        const formJson = attributes?.formJson;
        let formFields = {};
        if (formJson) {
          formJson.fields.forEach((elem2) => {
            const { group } = elem2;
            if (group && group.length > 0) {
              group.forEach((elem3) => {
                const { name } = elem3;
                formFields[name] = null;
              });
            } else {
              const { name } = elem2;
              formFields[name] = null;
            }
          });
        }
        segments.push({
          title: attributes.title,
          slug: attributes.slug,
          id: elem.id,
          formFields: Object.keys(formFields).length ? formFields : null,
        });
      });
      trackProgress.segments = segments;
      let ongoingTracks = user.progress ? user.progress.map((elem) => elem.parentTrackId) : [];
      if (ongoingTracks.includes(parentTrackId)) {
        setTrackAlreadyInProgress(true);
      } else {
        const postProgress = async () => {
          const payload = {
            progress: user.progress ? [...user.progress, trackProgress] : [trackProgress],
          };
          await axios
            .put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, payload, {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            })
            .then((res) => {
              handlers.mutateUser({
                progress: user.progress ? [...user.progress, trackProgress] : [trackProgress],
              });
              setTrackAlreadyInProgress(true);
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        postProgress();
      }
    }
  };

  const checkWistiaLoaded = (id) => {
    setWistiaLoaded(false);
    if (typeof window !== "undefined" && id) {
      window._wq = window._wq || [];
      _wq.push({
        id,
        onReady: function (video) {
          if (video.embedded) {
            setTimeout(() => {
              setWistiaLoaded(true);
            }, 100);
          }
        },
      });
      // console.log(window._wq);
    }
  };

  useEffect(() => {
    document.getElementById("segment-content").scrollTop = 0;
    updateIndexOfActiveTrackAndSegment();
    reset();
    checkWistiaLoaded(pageContent?.videoId);
  }, [asPath]);

  useEffect(() => {
    updateInitialTrackProgress();
  }, [isLoading]);

  useEffect(() => {
    updateIndexOfActiveTrackAndSegment();
  }, [trackAlreadyInProgress]);

  useEffect(() => {
    if (
      user &&
      user.progress &&
      progressIndexOfActiveTrack !== null &&
      progressIndexOfActiveSegment !== null
    ) {
      reset(
        user.progress[progressIndexOfActiveTrack].segments[progressIndexOfActiveSegment].formFields
      );
    }
    checkWistiaLoaded(pageContent?.videoId);
  }, [user, progressIndexOfActiveTrack, progressIndexOfActiveSegment]);

  return (
    <>
      <ProtectedRoute>
        <style global jsx>{`
          @media (min-width: 768px) {
            body {
              overflow: hidden;
            }
          }
        `}</style>
        <Dashboard segmentView>
          <Section className="py-3 THEME__border-bottom-light">
            <Container fluid>
              <div className="text-start">
                {isLoading && (
                  <>
                    <div style={{ maxWidth: "300px" }}>
                      <Skeleton borderRadius height={25} />
                    </div>
                    <div style={{ maxWidth: "150px" }}>
                      <Skeleton className="mt-2" borderRadius height={15} />
                    </div>
                  </>
                )}
                {parentTrackTitle && <h1 className="h4 mb-0 THEME__f-600">{parentTrackTitle}</h1>}
                {segmentTitle && <p className="mb-0 THEME__font-size-0n9">{segmentTitle}</p>}
              </div>
            </Container>
          </Section>
          <Section className="BLOCK__segment-view">
            <div className="BLOCK__segment-view__wrapper">
              <div className="BLOCK__segment-view__column BLOCK__segment-view__column-left">
                {isLoading && (
                  <>
                    <div className="pt-5 mt-5 THEME__generic-spinner-wrapper">
                      <Spinner />
                    </div>
                  </>
                )}
                {navigation && (
                  <div className="MODULE__segment-sidebar">
                    {navigation.map((elem, index) => {
                      const { attributes } = elem;
                      const { title, slug } = attributes;
                      const destination = `/${trackTypeSlug}/${parentTrackSlug}/${slug}`;
                      return (
                        <Link
                          href={destination}
                          key={index}
                          className="THEME__text-decoration-none"
                        >
                          <div
                            className={`MODULE__segment-sidebar__item ${
                              asPath == destination ? `MODULE__segment-sidebar__item-active` : ``
                            } THEME__cursor-pointer`}
                          >
                            {title && (
                              <div className="MODULE__segment-sidebar__item__row">
                                <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-left">
                                  <div
                                    className={`MODULE__segment-sidebar__item__progress-circle ${
                                      user &&
                                      progressIndexOfActiveTrack !== null &&
                                      user.progress[
                                        progressIndexOfActiveTrack
                                      ]?.segmentsCompleted.includes(elem.id) &&
                                      "MODULE__segment-sidebar__item__progress-circle-completed"
                                    }`}
                                  ></div>
                                </div>
                                <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-right">
                                  <h2 className="MODULE__segment-sidebar__item__heading h7 mb-0 THEME__f-600">
                                    {title}
                                  </h2>
                                </div>
                              </div>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                    <Link href="#" className="THEME__text-decoration-none">
                      <div className="MODULE__segment-sidebar__item MODULE__segment-sidebar__item mb-5">
                        <div className="MODULE__segment-sidebar__item__row">
                          <div className="MODULE__segment-sidebar__item__col MODULE__segment-sidebar__item__col-right">
                            <h2 className="MODULE__segment-sidebar__item__heading h7 mb-0 THEME__f-600">
                              Complete this track
                            </h2>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
              <div
                id="segment-content"
                className="BLOCK__segment-view__column BLOCK__segment-view__column-right"
              >
                {isLoading && (
                  <div className="THEME__mw-700 mx-auto BLOCK__medium px-4">
                    <div className="BLOCK__segment-view__body pb-md-5">
                      <div className="pt-5 mt-5 THEME__generic-spinner-wrapper">
                        <Spinner />
                      </div>
                    </div>
                  </div>
                )}
                {pageContent && (
                  <div className="THEME__mw-900 mx-auto BLOCK__medium px-4">
                    <div className="BLOCK__segment-view__body pb-md-5">
                      {pageContent.content && (
                        <>
                          {pageContent.videoId && (
                            <React.Fragment key={segmentSlug}>
                              <Script
                                src={`https://fast.wistia.com/embed/medias/${pageContent.videoId}.jsonp`}
                                strategy="beforeInteractive"
                              />
                              <Script
                                src={"https://fast.wistia.com/assets/external/E-v1.js"}
                                defer
                              />
                              <div
                                className={`${
                                  !wistiaLoaded ? `MODULE__wistia-wrapper-loading` : ``
                                } MODULE__wistia-wrapper`}
                              >
                                {!wistiaLoaded && <Spinner />}
                                <div
                                  className={`MODULE__wistia-wrapper__video wistia_embed wistia_async_${pageContent.videoId}`}
                                ></div>
                              </div>
                            </React.Fragment>
                          )}
                          <div className="THEME__mw-700 mx-auto">
                            <div className="MODULE__article-content MODULE__article-content-smaller-headings">
                              <ReactMarkdown>{pageContent.content}</ReactMarkdown>
                            </div>
                          </div>
                        </>
                      )}
                      {pageContent.form && (
                        <div className="BLOCK__segment-view__questionnaire pt-5 mt-5 THEME__border-top-light THEME__mw-700 mx-auto">
                          <Form
                            onSubmit={handleSubmit(onSubmit)}
                            register={register}
                            schema={pageContent.form}
                            errors={errors}
                            isDirty={isDirty}
                            isValid={isValid}
                            isLoading={submitForm.isLoading}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>
        </Dashboard>
        <Toaster position="top-center" reverseOrder={false} />
      </ProtectedRoute>
    </>
  );
};

export default Segment;
