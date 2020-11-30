var express = require('express')
var cors = require('cors')
var app = express()
const bodyParser = require('body-parser')
const fetch = require('node-fetch');
const mongoose = require('mongoose')
const YoutubeData = require('./models/youtube.model')
const scheduler = require('node-schedule');
const fileUpload = require('express-fileupload')
var publicDir = require('path').join(__dirname, '/banners/');

app.use(express.static(publicDir));
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(fileUpload())
const port = process.env.PORT || 5000;


//MongoDB 
const uri = "mongodb+srv://KapijaDB:KapijaDB@kapijadb.gbn9h.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log('mongo konekcija ok')
})



app.get('/', function (req, res) {
    fetch('http://s1.voscast.com:7470/stats?sid=1&json=1')
        .then(res => res.json())
        .then(text => res.send(text))
})




const youtubeRoute = require('./routes/youtube.routure')
const bannersRoute = require('./routes/Banners.routure')
const liveRoute = require('./routes/LiveURL.routere')

app.use('/api', youtubeRoute)
app.use('/banners', bannersRoute)
app.use('/live', liveRoute)





// Scheduled task every day at 08:35
const rule = new scheduler.RecurrenceRule();
rule.hour = 08;
rule.minute = 35;
rule.second = 00;
rule.dayOfWeek = new scheduler.Range(0, 6);

const dailyJob = scheduler.scheduleJob(rule, function () {
    fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=radiokapija&maxResults=15&key=AIzaSyC9UY47zlbUPVdGk8RmesM7fYxbOJGpfkQ')
        .then(response => response.json())
        .then(res => {
            const data = res
            const newYoutube = new YoutubeData({ data })
            YoutubeData.findById('5fb6cd8aede31a2fb8cdbcf0')
                .then(item => {
                    item.data = data
                    item.save()
                        .then((post) => console.log(post))
                        .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
        });
});




app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
