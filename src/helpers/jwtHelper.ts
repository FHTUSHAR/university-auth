import jwt, { Secret } from "jsonwebtoken";

export const createToken = (
  payload: object,
  secret: Secret,
  expireDay: object
): string => {
  const generatedToken = jwt.sign(payload, secret,  expireDay );
  return generatedToken;
};

