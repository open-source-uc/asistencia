import client from "./client";

const getMe = async () => {
  return client.get("/users/me");
}

export { getMe };
