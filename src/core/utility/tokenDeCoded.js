const jwt = require("jsonwebtoken")

const tokenDeCoded = (req) => {
  console.log(req.headers);
  const auHeader = req.headers.authorization;
  if (auHeader) {
    const token = auHeader.split(" ")[1];
    const decoded = jwt.decode(token)
    return {token: token, payload: decoded};
  } else {
    return undefined;
  }
};

module.exports = tokenDeCoded;
