const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LiveURLSchema = new Schema({
    url: {
        type: String,
        required: true,
    },

}, { timestamps: true })

const LiveURLModel = mongoose.model('Live', LiveURLSchema)

module.exports = LiveURLModel