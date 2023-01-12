import useSWR from "swr";
import axios from "axios";
import { sleeper } from "@/lib/Helpers";

// Main Fetcher Function
const Fetcher = (url, token) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then(sleeper(300))
    .then((res) => res.data);

// *****Get Requests (Client Side)
export const useOnboardingsGET = (token) => {
  const { data, error } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/onboardings?populate=*`, token] : null,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useOnboardingNavigationBySlugGET = (token) => {
  // TODO
};

export const useSegmentContentBySlugGET = (token) => {
  // TODO
};
