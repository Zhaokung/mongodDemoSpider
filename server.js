const express = require('express')
const app = express()
const request = require('superagent');
const bodyParser = require('body-parser')
// require('superagent-proxy')(request)
// const {getApi} = require('./utill/api')
// MongoDB
const MongoClient = require('mongodb').MongoClient
var db

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

const mongoUrl = `mongodb://2o5572137z.qicp.vip:31754/youtube`
const mongoColl = `channel`
MongoClient.connect(mongoUrl, (err, database) => {
  if (err) return console.log(err)
  db = database
})

// setup
app.listen(5008, () => {
  console.log('listen on http://localhost:5008')
})

app.post('/quotes', (req, res) => {
  console.log(req.body)
  requestAPI('')
  res.sendStatus(204)


  db.collection(mongoColl).insertOne(req.body, (err, result) => {
    console.log('ok')
  })

})

app.get('/quotes', (req, res) => {
  var cursor = db.collection(mongoColl).find({}).toArray((err, result) => {
    console.log(result)
    res.send(result)
  })
})

app.get('/', express.static(__dirname + '/public'))

// routes
app.get('/hello', (req, res) => {
  res.send('Hello, world')
})


//获取数据
function requestAPI(url, type) {
  // HTTP, HTTPS, or SOCKS proxy to use 
  // var proxy_uri = process.env.http_proxy || 'http://127.0.0.1:7891';
  // console.log(proxy_uri)
  url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&key=AIzaSyCVipmBlDn3AGGYxh4E2aqLvGQk0YhDahI&type=channel&q=&maxResults=50'
  // url = 'https://wwww.baidu.com'
  console.log(11)
  request.get(url).set('Referer','commentpicker.com').end((err, result) => {
    if (err) {
      console.log('失败')
    }
    console.log(result)
  })
}







/**
//insert one
function insertOne(body) {
  return new Promise((reslove, reject) => {
    db.collection(mongoColl).insertOne(body, (err, result) => {
      if (err) {
        reject(err)
      }
      console.log('saved to database')
      reslove(204)
    })
  })
}



//写入
function write(data, type) {
  data.forEach(el => {
    insertOne(el).then(result => {
      console.log(result)
    }).catch(err => {
      console.log(err)
    })
  })
  console.log('写入成功');
}

//休眠
function sleep(type, start, limit) {
  let url = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&key=AIzaSyCVipmBlDn3AGGYxh4E2aqLvGQk0YhDahI&type=channel&q=&maxResults=50&pageToken=CAUQAA`
  console.log('url:', url)
  requestAPI(url, type)

  let time = Math.random() * 240;
  console.log('wait', time)
  setTimeout(() => {
    console.log('time', new Date())
    requestAPI(url, type)
    // sleep(type, start + limit, limit)
  }, time * 1000)
}

function start() {
  sleep(1)
}
*/