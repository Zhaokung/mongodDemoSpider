const express = require('express')
const app = express()
const request = require('superagent');
const bodyParser = require('body-parser')
// require('superagent-proxy')(request)

// const { getApi } = require('./utill/api')
const MongoDB = require('./utill/mongo')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// setup
app.listen(5008, () => {
  console.log('listen on http://34.92.145.1:5008/')
})

app.post('/quotes', (req, res) => {
  console.log(req.body)
  requestAPI().then(result=>{
    console.log(result)
    MongoDB.insertOne(JSON.parse(result.text))
  }).catch(err=>{
    console.log(err)
  })
  res.sendStatus(204)
})

app.get('/quotes', (req, res) => {
  MongoDB.find({})
  res.send('hello')
})

app.get('/', express.static(__dirname + '/public'))


//获取数据
function requestAPI(url, type) {
  return new Promise((resolve, reject) => {
    url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&key=AIzaSyCVipmBlDn3AGGYxh4E2aqLvGQk0YhDahI&type=channel&q=&maxResults=50'
    // url = 'https://wwww.baidu.com'
    request.get(url).end((err, result) => {
      if (err) {
        reject('获取失败')
      }
      resolve(result)
    })
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