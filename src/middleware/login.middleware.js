const tokenDeCoded = require("../core/utility/tokenDeCoded")

const loginMiddleware = (req, res, next) => {
    token = tokenDeCoded(req)
    next()
}

module.exports = loginMiddleware