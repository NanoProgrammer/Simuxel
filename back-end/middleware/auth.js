// middleware/auth.js
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRECT_KEY;

export const requireAuth = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).send("Access denied.");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // { id, email, role }
    next();
  } catch (err) {
    return res.status(403).send("Invalid or expired token.");
  }
};

export const requireAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).send("Access denied.");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role !== 'admin') {
      return res.status(403).send("Admin access only.");
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).send("Invalid or expired token.");
  }
};
