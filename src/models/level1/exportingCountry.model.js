const mongoose = require("mongoose")

const Schema = mongoose.Schema

const exportingCountrySchema = new Schema({
    name: { type: String, required: true }
})

module.exports = mongoose.model("exportingcountrys", exportingCountrySchema)