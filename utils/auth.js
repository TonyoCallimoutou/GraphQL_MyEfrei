import { hash, verify } from "argon2";
import jwt from "jsonwebtoken";

// Verification
export const hashPassword = async (password) => {
  return await hash(password);
};

export const verifyPassword = async (hash, password) => {
  return await verify(hash, password);
};

export const signToken = (data, context) => {
  let token =  jwt.sign(data, process.env.JWT_SECRET);
  context.res.cookie('token', token, { httpOnly: true, secure: true });
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};


