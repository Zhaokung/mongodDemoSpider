// MongoDB
const MongoClient = require('mongodb').MongoClient
var db


const mongoUrl = `mongodb://2o5572137z.qicp.vip:31754/`
const database = `youtube`
MongoClient.connect(`${mongoUrl}${database}`, (err, database) => {
  if (err) return console.log(err)
  db = database
})

function insertOne(data, col) {
  return new Promise((resolve, reject) => {
    let Collection = col || `channel`
    db.collection(Collection).insertOne(data, (err, result) => {
      if (err) {
        reject(err)
      }
      console.log('save to database')
      resolve(true)
    })
  })
}

function find(data, skip, limit, col) {
  return new Promise((resolve, reject) => {
    let Collection = col || `channel`
    db.collection(Collection).find(data, { skip: skip, limit: limit }).toArray((err, result) => {
      if (err) {
        reject(err)
      }
      resolve(result)
    })
  })
}

function loopChannelID(skip, limit) {
  console.log(skip)
  find({}, skip, limit).then(result => {
    if (result[0]) {
      result[0].items.forEach(el => {
        const keyId = el.id
        keyId.youtubeUrl = `https://www.youtube.com/channel/${el.id.channelId}`
        keyId.socialUrl = `https://socialblade.com/youtube/channel/${el.id.channelId}/videos`
        keyId.title = el.snippet.title
        keyId.description = el.snippet.title
        insertOne(keyId, `channelIdColl`)
      });
      setTimeout(() => {
        loopChannelID(skip + 1, limit)
      }, 100)
    } else {
      console.log('down')
      return false
    }
  }).catch(err => {
    console.log(err)
    return false
  })
}

const MongoDB = {
  insertOne,
  find,
  loopChannelID
}

module.exports = MongoDB
