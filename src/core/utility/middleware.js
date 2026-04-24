const tokenDeCoded = require("./tokenDeCoded");

const middleware = async (req, res, next) => {
  const token = tokenDeCoded(req);
  if (token) {
    console.log("token ==>", token.token);
    console.log("payload ==>", token.payload);
    next();
  } else {
    return res
      .status(401)
      .json({ message: "لطفا ابتدا وارد حساب کاربری خود شوید" });
  }
};

const adminMiddleware = async (req, res, next) => {};

module.exports = { middleware, adminMiddleware };
