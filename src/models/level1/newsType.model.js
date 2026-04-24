const mongoose = require("mongoose")

const Schema = mongoose.Schema

const newsTuypeSchema = new Schema({
    name: { type: String, required: true }
})

module.exports = mongoose.model("newstypes", newsTuypeSchema)