import useSWR from "swr";
import axios from "axios";

// Main Fetcher Function
const Fetcher = (url, token) =>
  axios
    .get(url, token ? { headers: { Authorization: "Bearer " + token } } : ``)
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

export const useOnboardingNavigationBySlugGET = (slug, token) => {
  const { data, error } = useSWR(
    token
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}/onboardings?filters[slug][$eq]=${slug}&populate=*`,
          token,
        ]
      : null,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSegmentBySlugGET = (slug, token) => {
  const { data, error } = useSWR(
    token
      ? [`${process.env.NEXT_PUBLIC_API_URL}/segments?filters[slug][$eq]=${slug}&populate=*`, token]
      : null,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useUserDataById = (id) => {
  const { data, error } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/users/${id}` : null,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
