const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: 'dwejxcshz',
    api_key: '524956264897297',
    api_secret: 'A15W2TnmhGgMnfrqAE-KyW44PSY'
});



exports.uploads = async (file, folder) => {
return     await   cloudinary.uploader.upload(file, (result) => {
      
                return result
       
       
           
        })
   
}