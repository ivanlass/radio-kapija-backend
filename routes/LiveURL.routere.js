const LiveURL = require('../models/LiveURL.model')
const router = require('express').Router()




router.route('/').get((req, res) => {
    LiveURL.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err))
})





router.route('/add').post((req, res) => {

    const url = req.body.url


    const newURL = new LiveURL({ url })

    newURL.save()
        .then(() => {
            return LiveURL.find()
                .then(post => res.json(post))
                .catch(err => res.status(400).json('Error:' + err))
        })
        .catch(err => res.status(400).json('Error' + err))
})







router.route('/delete').post((req, res) => {

    LiveURL.findByIdAndDelete(req.body.id)
        .then(() => {
            LiveURL.find()
                .then(posts => res.json(posts))
                .catch(err => res.status(400).json('err' + err))
        })
        .catch(err => res.status(400).json('error:' + err))
})


module.exports = router