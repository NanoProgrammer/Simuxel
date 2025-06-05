import jwt from "jsonwebtoken";

const SECRECT_KEY = process.env.SECRECT_KEY;

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).send("Access denied.");
  }

  try {
    const decoded = jwt.verify(token, SECRECT_KEY);
    req.user = decoded; // guardar info del token para usar después
    next();
  } catch (err) {
    res.status(403).send("Invalid or expired token.");
  }
};