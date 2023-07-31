const jwt = require("jsonwebtoken");

export const decodeToken = async (header: string) => {
  const token = header.split(" ")[1];
  const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
  const userId = decodedToken.id;
  return userId;
};
