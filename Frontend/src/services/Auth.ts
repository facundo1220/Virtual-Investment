import envConfig from "../config/envConfig";

interface LoginInterface {
  email: string;
  password: string;
}

export const LoginProcess = async ({ email, password }: LoginInterface) => {
  const jsonData = { email, password };

  const response = await fetch(`${envConfig.API_BASE_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    let errorMessage = "An unexpected error occurred";

    for (const key in responseJson) {
      errorMessage = responseJson[key];
    }

    throw new Error(errorMessage);
  }

  return responseJson;
};

export const validateToken = async () => {
  const access_token = localStorage.getItem("access_token");

  const response = await fetch(
    `${envConfig.API_BASE_URL}/auth/validateSesion`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (!response.ok) {
    return false;
  }

  return true;
};
