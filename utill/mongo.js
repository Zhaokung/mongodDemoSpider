// MongoDB
const MongoClient = require('mongodb').MongoClient
var db

MongoClient.connect('mongodb://192.168.1.27:27017/youtube', (err, database) =>{

  if(err) return console.log(err)

  db = database

  // setup
  app.listen(5008, () => {
    console.log('listen on 5008')
  })

  app.post('/quotes', (req, res) => {
    console.log(req.body)

    database.collection('quotes').insertOne(req.body, (err, result) => {
      
    })

  })

  app.get('/quotes', (req, res) => {
    var cursor = db.collection('quotes').find({}).toArray((err,result)=>{
      console.log(result)
      res.send(result)
    })
  })

})

const MongoDB = {
  insertOne(data){
     db.collection(collection).insertOne(data,(err,result) =>{
      if (err) return console.log(err)

      console.log('saved to database')

      res.sendStatus(204) 
     })
  },
  find(data){
    var cursor = db.collection('quotes').find({}).toArray((err,result)=>{
      console.log(result)
      res.send(result)
    })
  }
  
}

// const SQL=() =>{
//   try {
//     const collection = 'channel'
//     return db.collection(collection)
//   } catch (error) {
//   }
// }