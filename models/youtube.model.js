const { json } = require('express')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const youtubeSchema = new Schema({
    data: {
        type: Object,
        required: true,

    }


})

const YoutubeModel = mongoose.model('youtubeAPIData', youtubeSchema)

module.exports = YoutubeModel