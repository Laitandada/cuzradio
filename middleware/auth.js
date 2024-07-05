import jwt from "jsonwebtoken";
import "dotenv/config";

// Middleware to check authentication
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: 'add an authorized user token to the bearer token' });
  }
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to check user roles
const checkRole = (roles) => (req, res, next) => {
  console.log(roles,"roles")
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};

const filterSensitiveFields = (doc, sensitiveFields = []) => {
  const obj = doc.toObject();
  sensitiveFields.forEach(field => {
    if (Object.prototype.hasOwnProperty.call(obj, field)) {
      delete obj[field];
    }
  });
  return obj;
};
export { auth, checkRole, filterSensitiveFields };
