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
  let parentTrackTitle, navigation, activeSegment, segmentTitle, pageContent;
  const { data, isLoading, isError } = useOnboardingNavigationBySlugGET(
    parentTrackSlug,
    user?.token
  );

  if (data) {
    navigation = data?.data[0]?.attributes?.segments.data;
    parentTrackTitle = data?.data[0]?.attributes.title;
    activeSegment = navigation.filter((elem) => elem?.attributes?.slug === segmentSlug)[0]
      .attributes;
    segmentTitle = activeSegment.title;
    pageContent = {
      content: activeSegment.content,
      form: activeSegment.formJson,
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
        />
      </ProtectedRoute>
    </>
  );
};

export default SegmentPage;
