const jwt = require("jsonwebtoken");

const tokenGeneration = (userData) => {
  const { id, userName, role } = userData;
  const payload = {
    id: id,
    userName: userName,
    role: role,
  };

  const secretKey = "your-secret-key";

  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
};

module.exports = tokenGeneration