const mongoose = require("mongoose")

const Schema = mongoose.Schema
const type = { type: String, required: true }

const commentAboutUseSchema = new Schema({
    fullName: type,
    email: type,
    message: type
})

module.exports = mongoose.model("commentaboutuse", commentAboutUseSchema)