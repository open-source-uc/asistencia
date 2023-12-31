const sha512 = async (str: string): Promise<string> => {
  // https://stackoverflow.com/questions/55926281
  return crypto.subtle
    .digest("SHA-512", new TextEncoder().encode(str))
    .then((buf) => {
      return Array.prototype.map
        .call(new Uint8Array(buf), (x) => ("00" + x.toString(16)).slice(-2))
        .join("");
    });
};

const clientHash = async (
  code: string,
  courseId: string
): Promise<string> => {
  return await sha512(`${await sha512(`${code}${courseId}`)}${courseId}`);
};

export { sha512, clientHash };
