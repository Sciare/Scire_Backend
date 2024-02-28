const jwt = require("jsonwebtoken");

export const decodeToken = async (header: string): Promise<number | null> => {
  if (!header || !header.startsWith("Bearer ")) {
    console.error("Invalid token format");
    return null;
  }

  try {
    const token = header.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.id;
  } catch (error) {
    console.error("Decode error: ", error);
    return null;
  }
};
export const decodeTokenFromParams = async (token: any): Promise<number | null> => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken.id;
  } catch (error) {
    console.error("Decode error: ", error);
    return null;
  }
};
