const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// MongoDB
const MongoClient = require('mongodb').MongoClient
var db

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

MongoClient.connect('mongodb://localhost:27017/mongodemo', (err, database) =>{

  if(err) return console.log(err)

  db = database

  // setup
  app.listen(5008, () => {
    console.log('listen on 5008')
  })

  app.post('/quotes', (req, res) => {
    console.log(req.body)

    database.collection('quotes').insertOne(req.body, (err, result) => {
      if (err) return console.log(err)

      console.log('saved to database')

      res.sendStatus(204)
    })

  })

  app.get('/quotes', (req, res) => {
    var cursor = db.collection('quotes').find({}).toArray((err,result)=>{
      console.log(result)
      res.send(result)
    })
  })

})

app.get('/', express.static(__dirname + '/public'))

// routes
app.get('/hello', (req, res) => {
  res.send('Hello, world')
})
