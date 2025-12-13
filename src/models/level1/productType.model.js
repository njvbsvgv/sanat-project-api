const mongoose = require("mongoose")

const Schema = mongoose.Schema

const productTuypeSchema = new Schema({
    name: { type: String, required: true }
})

module.exports = mongoose.model("producttypes", productTuypeSchema)