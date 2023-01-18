import React from "react";
import { useAppContext } from "@/context/AppWrapper";
import ProtectedRoute from "@/lib/ProtectedRoute";
import Segment from "@/components/layouts/Segment";
import { useOnboardingNavigationBySlugGET } from "@/lib/Fetcher";
import { useRouter } from "next/router";

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
    activeSegment = navigation.filter((elem) => elem?.attributes?.slug === segmentSlug)[0];
    activeSegmentData = activeSegment.attributes;
    activeSegmentId = activeSegment.id;
    segmentTitle = activeSegmentData.title;
    pageContent = {
      content: activeSegmentData.content,
      form: activeSegmentData.formJson,
      videoId: activeSegmentData.videoId,
    };
  }

  return (
    <>
      <ProtectedRoute>
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
      </ProtectedRoute>
    </>
  );
};

export default SegmentPage;
