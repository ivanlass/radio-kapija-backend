const Banners = require('../models/Banners.model')
const router = require('express').Router()
const fileUpload = require('express-fileupload')
const fs = require('fs')



router.route('/').get((req, res) => {
    Banners.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error' + err))
})





router.route('/add').post((req, res) => {
    const banner = req.files.banner
    const placement = req.body.placement
    const link = req.body.link

    banner.mv('banners/' + banner.name, function (error) {
        if (error) {
            console.log(error)
        } else { console.log('Success') }
    })

    const newBanner = new Banners({ path: banner.name, placement, link })

    newBanner.save()
        .then(() => {
            return Banners.find()
                .then(post => res.json(post))
                .catch(err => res.status(400).json('Error:' + err))
        })
        .catch(err => res.status(400).json('Error' + err))
})





router.route('/delete').post((req, res) => {
    const id = req.body.id
    const name = req.body.name
    Banners.findByIdAndDelete(id)
        .then(users => {
            Banners.find()
                .then(users => res.json(users))
                .catch(err => res.status(400).json('Error' + err))
        })
        .catch(err => res.status(400).json('Error' + err))
    fs.unlinkSync(`banners/${name}`)
})


module.exports = router