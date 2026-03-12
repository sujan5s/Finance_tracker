import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {

    const decoded = jwt.verify(token, "secret123");

    // FIX
    req.user = { id: decoded.id };

    next();

  } catch (error) {

    return res.status(401).json({ message: "Invalid token" });

  }

};

export default authMiddleware;