// middleware/auth.js
import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.SECRET_KEY;

export const requireAuth = (req, res, next) => {
  const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

export const requireAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ error: "Acess denied" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: "Acess denied, acess only for admins" });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
