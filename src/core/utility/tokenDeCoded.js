const tokenDeCoded = (req) => {
  console.log(req.headers);
  const auHeader = req.headers.authorization;
  if (auHeader) {
    const token = auHeader.split(" ")[1];
    return token;
  } else {
    return undefined;
  }
};

module.exports = tokenDeCoded;
