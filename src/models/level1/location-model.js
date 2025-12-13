const mongoose = require("mongoose")

const Schema = mongoose.Schema

const locationSchema = new Schema({
    locationLat: { type: String, required: true },
    locationLon: { type: String, required: true },
})

module.exports = mongoose.model("locationdatas", locationSchema)