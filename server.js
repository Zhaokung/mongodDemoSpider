const express = require('express')
const app = express()
const request = require('superagent');
const MD5 = require('md5')
const bodyParser = require('body-parser')
// require('superagent-proxy')(request)
// const { getApi } = require('./utill/api')
const FormData = require('form-data');
const { getCsv, writeJSONFiel } = require('./utill/readerCsv')
const { getJSON } = require('./utill/zh.js')
const MongoDB = require('./utill/mongo')

const csvArry = []

// getCsv().then(res=>{
//   if(csvArry){
//     res.forEach(element => {
//       csvArry.push({"q":element.name})
//     });
//   }
//    console.log(csvArry.length)
// })


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// setup
app.listen(5006, () => {
  console.log('listen on http://localhost:5006/')
})

app.post('/quotes', (req, res) => {
  // start()
  // MongoDB.find({},0,1).then(result=>{
  //   console.log(result)
  // })

  // channelVideo(69793,1)
  // MongoDB.loopChannelID(0,1)

  out()

  res.sendStatus(204)
})

app.get('/quotes', (req, res) => {
  res.send('hello')
})

app.get('/', express.static(__dirname + '/public'))


function BaiduTranslet(query) {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      const url = 'http://fy.iciba.com/ajax.php?a=fy'
      const data = {
        f: 'zh',
        t: 'en',
        w: query
      }
      request.post(url).type('form').send(data).end((err, result) => {
        if (err) {
          reject('获取失败')
        }
        resolve(result)
      })
    },100)
  })
}

const tes = {
  name:'名字',
  app: { appl:'苹果'}
}
const json = getJSON()
async function eachObj(data) {
  for (const key in data) {
    if (data.hasOwnProperty(key) && typeof (data[key]) === 'string') {
      const element = await BaiduTranslet(data[key]) 
      console.log(data[key]+'::'+JSON.parse(element.text).content.out)
      data[key] = JSON.parse(element.text).content.out
    } else {
      eachObj(data[key])
    }
  }
 
}

async function out(){
  await eachObj(json)
  setTimeout(() => {
    console.log(json)
    writeJSONFiel(json)
  }, 1000*16);
}


//API获取数据
function requestAPI(data) {
  return new Promise((resolve, reject) => {
    url = `https://www.googleapis.com/youtube/v3/search?part=id,snippet&key=AIzaSyCVipmBlDn3AGGYxh4E2aqLvGQk0YhDahI&type=channel&q=${encodeURIComponent(data.q)}&maxResults=50&order=viewCount`
    request.get(url).set('Referer', 'commentpicker.com').end((err, result) => {
      if (err) {
        reject('获取失败')
      }
      resolve(result)
    })
  })
}

let count = 0
function start() {
  if (csvArry[count]) {
    console.log(csvArry[count])
    requestAPI(csvArry[count]).then(result => {

      const data = JSON.parse(result.text)
      console.log(data.items.length, 'items length')
      data.queryString = csvArry[count].q
      MongoDB.insertOne(data).then(result => {
        count++
        sleep(start, 8)
      })
    })
  } else {
    console.log("down")
    return false
  }
}

function sleep(func, space) {
  setTimeout(() => {
    console.log(count)
    func()
  }, 1000 * Math.random() * space)
}


function getChannelVideo(data) {
  return new Promise((resolve, reject) => {
    const formdata = { channelid: data.channelId }
    const url = `https://socialblade.com/js/class/youtube-video-recent`
    request.post(url).type('form').send(formdata).then((result) => {
      const tempdata = {
        title: data.title,
        channelId: data.channelId,
        description: data.description,
        videos: JSON.parse(result.text)
      }
      resolve(tempdata)
    }).catch((err) => {
      console.log('这里失败了')
      reject(err)
    });
  })
}

function getFormData(ObjData) {
  const formdata = new FormData()
  for (const key in ObjData) {
    if (ObjData.hasOwnProperty(key)) {
      const element = ObjData[key];
      formdata.append(key, element)
    }
  }
  return formdata
}

function channelVideo(skip, limit) {
  console.log(skip)
  MongoDB.find({}, skip, limit, `channelIdColl`).then((result) => {
    if (result[0] && skip > 69000) {
      getChannelVideo(result[0]).then(resp => {
        MongoDB.insertOne(resp, `channelVideoBackOrd`)
        setTimeout(() => {
          channelVideo(skip - 1, limit)
        }, 1000 * Math.random() * 3)
      })
    } else {
      console.log('down')
      return false
    }
  }).catch((err) => {
    console.log(err)
    return false
  });
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
