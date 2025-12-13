const monggose = require("mongoose")

const Schema = monggose.Schema

const ProductPieceSchema = new Schema({
    name: { type: String, required: true }
})

module.exports = monggose.model("productpieces", ProductPieceSchema)