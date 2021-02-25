const Banners = require('../models/Banners.model')
const router = require('express').Router()
const fileUpload = require('express-fileupload')
const fs = require('fs')
const cloudinar = require('cloudinary')
const cloudinary = require('../cloudinary')

router.route('/').get((req, res) => {
    Banners.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error' + err))
})





router.route('/add').post((req, res) => {
    const banner = req.files.banner
    const placement = req.body.placement
    const link = req.body.link
    const uploader = async(path) => await cloudinary.uploads(path, 'images')
    
    fs.readFile(banner.path, function (err, data) {
        fs.writeFile(banner.originalFilename, data, async function (err) {
            const newPath = await uploader(banner.path)
            const newBanner = new Banners({ path:{url:newPath.secure_url, id:newPath.public_id}, placement, link })
            newBanner.save()
            .then(() => {
                return Banners.find()
                .then(post => res.json(post))
                .catch(err => res.status(400).json('Error:' + err))
            })
            .catch(err => res.status(400).json('Error' + err))
        });
    });
    
    
    
})

// router.route('/delete').post((req, res) => {
//     const id = req.body.id
//     const name = req.body.name
//     Banners.findByIdAndDelete(id)
//     .then(users => {
//         Banners.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json('Error' + err))
//     })
//     .catch(err => res.status(400).json('Error' + err))
//     fs.unlinkSync(`banners/${name}`)
// })




router.route('/delete').post((req, res) => {
    const id = req.body.id
    const name = req.body.name
    Banners.findById(id)
    .then(banner => {
        try{
            cloudinar.v2.uploader.destroy(banner.path.id, async(err, res) => {
              console.log(res)
            });
          }catch(err){
            console.log(err)
          }
          Banners.findByIdAndDelete(id)
              .then(users => {
                  Banners.find()
                  .then(users => res.json(users))
                  .catch(err => res.status(400).json('Error' + err))
              })
              .catch(err => res.status(400).json('Error' + err))
    })
    .catch(err => res.status(400).json('Error' + err))
})


module.exports = router