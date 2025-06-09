import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

// Middleware que asegura que el usuario está autenticado
export function requireAuth(req, res, next) {
  const token = req.cookies['access_token'];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // Agrega los datos del usuario al request
    next();
  } catch {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
}

// Middleware que asegura que el usuario es admin
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: "Admin access only." });
  }
  next();
}
