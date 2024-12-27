import { authenticatedFetch } from "./authenticatedFetch";


interface LoginInterface {
  email: string;
  password: string;
}

export const LoginProcess = async ({ email, password }: LoginInterface) => {
  const jsonData = { email, password };

  const response = await fetch("http://0.0.0.0:3000/auth/login/", {
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


