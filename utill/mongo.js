// MongoDB
const MongoClient = require('mongodb').MongoClient
var db

const mongoUrl = `mongodb://2o5572137z.qicp.vip:31754/`
const database = `youtube`
const Collection = `channel`
MongoClient.connect(`${mongoUrl}${database}`, (err, database) =>{
  if(err) return console.log(err)
  db = database
})

const MongoDB = {
  insertOne(data){
    return new Promise((resolve,reject) =>{
      db.collection(Collection).insertOne(data,(err,result) =>{
       if (err){
         console.log(err)
        reject(err)
       }
       console.log('saved to database') 
       resolve(true)
      })
    })
  },
  find(data){
    var cursor = db.collection(Collection).find(data).toArray((err,result)=>{
      console.log(resul)
    })
  }
  
}

module.exports = MongoDB