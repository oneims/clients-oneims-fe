import React, { useEffect } from "react";
import { useRouter } from "next/router";

const SegmentsArchive = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/login`);
  }, []);
  return <></>;
};

export default SegmentsArchive;
