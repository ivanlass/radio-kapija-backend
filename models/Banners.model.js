const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BannersSchema = new Schema({
    path: {
        type: Object,
        required: true,
    },
    placement: {
        type: String,
        required: true,
    },

    link: {
        type: String,
        required: false,
    }


}, { timestamps: true })

const BannersModel = mongoose.model('Banners', BannersSchema)

module.exports = BannersModel