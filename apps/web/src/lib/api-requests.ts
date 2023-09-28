export const getRequest = async (url: string) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const postRequest = async (url: string, data: any) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
