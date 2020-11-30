const router = require('express').Router()
const YoutubeData = require('../models/youtube.model')



router.route('/').get((req, res) => {
    YoutubeData.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err))
})










module.exports = router