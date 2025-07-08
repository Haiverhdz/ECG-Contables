import jwt from "jsonwebtoken";
import entorno from "../config/env.js";

export const userFromToken = (req, res, next) => {
  const token = req.signedCookies.authToken;
  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, entorno.jwt_secret);
    res.locals.user = decoded; // Este 'decoded' es lo que pusiste en generateToken
  } catch (error) {
    res.locals.user = null;
  }

  next();
};
