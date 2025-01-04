import envConfig from "../config/envConfig";

export const authenticatedFetch = async (url: string, options: RequestInit) => {
  const access_token = localStorage.getItem("access_token");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = "An unexpected error occurred";

    throw new Error(errorMessage);
  }

  return response;
};

