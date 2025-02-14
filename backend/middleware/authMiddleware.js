const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No valid token provided." });
  }

  try {
    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attaching verified user data to `req.user`
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
