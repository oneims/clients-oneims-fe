import React from "react";
import { useAppContext } from "@/context/AppWrapper";
import Dashboard from "@/components/wrappers/Dashboard";
import ProtectedRoute from "@/lib/ProtectedRoute";
import Section from "@/components/wrappers/Section";
import Container from "@/components/wrappers/Container";
import Segment from "@/components/layouts/Segment";
import { useOnboardingNavigationBySlugGET } from "@/lib/Fetcher";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

const SegmentPage = () => {
  const { user } = useAppContext();
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const parentTrackSlug = router?.query?.track;
  const trackTypeSlug = pathname.split("/")[1];
  const segmentSlug = query?.segment;
  let parentTrackTitle,
    navigation,
    activeSegment,
    activeSegmentData,
    activeSegmentId,
    segmentTitle,
    parentTrackId,
    pageContent;
  const { data, isLoading, isError } = useOnboardingNavigationBySlugGET(
    parentTrackSlug,
    user?.token
  );

  if (data) {
    navigation = data?.data[0]?.attributes?.segments.data;
    parentTrackTitle = data?.data[0]?.attributes.title;
    parentTrackId = data?.data[0].id;
    if (segmentSlug !== `complete`) {
      activeSegment = navigation.filter((elem) => elem?.attributes?.slug === segmentSlug)[0];
      activeSegmentData = activeSegment?.attributes;
      activeSegmentId = activeSegment?.id;
      segmentTitle = activeSegmentData?.title;
      pageContent = {
        content: activeSegmentData?.content,
        form: activeSegmentData?.formJson,
        videoId: activeSegmentData?.videoId,
      };
    }
  }

  return (
    <>
      <NextSeo
        title={`${
          segmentTitle && parentTrackTitle
            ? `${segmentTitle} | ${parentTrackTitle}`
            : `Onboarding Segment`
        } | Clients OneIMS`}
      />
      <ProtectedRoute>
        {!user.organization ? (
          <Dashboard>
            <Section className="THEME__bg-app-light BLOCK__small THEME__border-bottom">
              <Container>
                <div className="text-center">
                  <h1 className="h1 mb-0">Not allowed</h1>
                </div>
              </Container>
            </Section>
            <Section className="BLOCK__default">
              <Container>
                <div
                  className="MODULE__form__message-alert THEME__mw-600 mx-auto THEME__font-size-0n9 mt-3 text-center"
                  role="alert"
                >
                  <span>
                    Your account is not currently associated with an organization. Please get in
                    touch with OneIMS Support to continue.
                  </span>
                </div>
              </Container>
            </Section>
          </Dashboard>
        ) : (
          <>
            {segmentSlug !== `complete` ? (
              <Segment
                isLoading={isLoading}
                asPath={asPath}
                trackTypeSlug={trackTypeSlug}
                parentTrackSlug={parentTrackSlug}
                parentTrackTitle={parentTrackTitle}
                navigation={navigation}
                segmentTitle={segmentTitle}
                segmentSlug={segmentSlug}
                pageContent={pageContent}
                activeSegmentId={activeSegmentId}
                parentTrackId={parentTrackId}
              />
            ) : (
              <Segment
                isLoading={isLoading}
                asPath={asPath}
                trackTypeSlug={trackTypeSlug}
                parentTrackSlug={parentTrackSlug}
                parentTrackTitle={parentTrackTitle}
                navigation={navigation}
                segmentTitle={`Complete This Track`}
                parentTrackId={parentTrackId}
                isCompletePage={true}
              />
            )}
          </>
        )}
      </ProtectedRoute>
    </>
  );
};

export default SegmentPage;
