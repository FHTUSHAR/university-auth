import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const createToken = (
  payload: object,
  secret: Secret,
  expireDay: object
): string => {
  const generatedToken = jwt.sign(payload, secret, expireDay);
  return generatedToken;
};

export const verifyToken = (token: string, secret: Secret):JwtPayload => {
  const generatedToken = jwt.verify(token, secret);
  return generatedToken as JwtPayload;
};
