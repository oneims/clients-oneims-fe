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

const Segment = ({
  isLoading,
  asPath,
  trackTypeSlug,
  parentTrackSlug,
  parentTrackTitle,
  segmentTitle,
  navigation,
  pageContent,
}) => {
  const { user } = useAppContext();
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
  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    document.getElementById("segment-content").scrollTop = 0;
  }, [asPath]);

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
                                      index == 0 &&
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
                  <div className="THEME__mw-700 mx-auto BLOCK__medium px-4">
                    <div className="BLOCK__segment-view__body pb-md-5">
                      {pageContent.content && (
                        <div className="MODULE__article-content MODULE__article-content-smaller-headings">
                          <ReactMarkdown>{pageContent.content}</ReactMarkdown>
                        </div>
                      )}
                      {pageContent.form && (
                        <div className="BLOCK__segment-view__questionnaire pt-5 mt-5 THEME__border-top-light">
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
      </ProtectedRoute>
    </>
  );
};

export default Segment;
