import client from "./client";

export const loginUser = async (username: string, password: string) => {
  const credentials = {
    username: username,
    password: password,
  };
  try {
    const endpoint = "/auth/jwt/login";
    const response = await client.post(endpoint, credentials, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userDetails: object) => {
  try {
    const endpoint = "/auth/register";
    const response = await client.post(endpoint, userDetails);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const endpoint = "/auth/jwt/logout";
    await client.post(endpoint);
  } catch (error) {
    throw error;
  }
};

export const verifyToken = async (token: string) => {
  const data = {
    token: token,
  };
  try {
    const endpoint = "/auth/verify";
    const response = await client.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
