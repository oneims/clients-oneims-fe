import useSWR from "swr";
import axios from "axios";

// Main Fetcher Function
export const Fetcher = (url, token) =>
  axios
    .get(url, token ? { headers: { Authorization: "Bearer " + token } } : ``)
    .then((res) => res.data);

// Reusable Axios Request
export const fetchFromAxios = async (url, token) => {
  try {
    const response = await axios.get(
      url,
      token ? { headers: { Authorization: "Bearer " + token } } : ``
    );
    return response;
  } catch (err) {
    return err;
  }
};

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

export const useFindUserByEmailGET = (email, token) => {
  const { data, error } = useSWR(
    token
      ? [`${process.env.NEXT_PUBLIC_API_URL}/users?filters[$and][0][email][$eq]=${email}`, token]
      : null,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useFindOrganizationByBasecampIdGET = (basecampId, token) => {
  const { data, error } = useSWR(
    token && basecampId
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}/organizations?filters[$and][0][basecampId][$eq]=${basecampId}`,
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

export const useProjectsFromBasecampGET = (token) => {
  const { data, error } = useSWR(
    token ? [`${process.env.NEXT_PUBLIC_API_URL}/basecamp/fetch?route=projects.json`, token] : null,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSingleProjectFromBasecampGET = (projectId, token) => {
  const { data, error } = useSWR(
    token
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}/basecamp/fetch?route=projects/${projectId}.json`,
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

export const usePeopleFromProjectGET = (projectId, token) => {
  const { data, error } = useSWR(
    token
      ? [
          `${process.env.NEXT_PUBLIC_API_URL}/basecamp/fetch?route=projects/${projectId}/people.json`,
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

export const usePasswordlessAuthGET = (token) => {
  const { data, error } = useSWR(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/passwordless/login?loginToken=${token}` : null,
    Fetcher
  );
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
