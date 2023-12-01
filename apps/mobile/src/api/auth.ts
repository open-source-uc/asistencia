import client from "./client";

export const loginUser = async (email: string, password: string) => {
  const credentials = {
    user: {
      email,
      password,
    },
  };

  try {
    const endpoint = "/users/sign_in";
    const response = await client.post(endpoint, credentials, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const endpoint = "/users/sign_out";
    await client.delete(endpoint);
  } catch (error) {
    throw error;
  }
};
