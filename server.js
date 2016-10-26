var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', express.static(__dirname + '/public'));

// routes
app.get('/hello', function (req, res) {
  res.send('Hello, world')
})

app.post('/quotes', function (req, res) {
  console.log(req.body)
  res.sendStatus(204)
})

// setup
app.listen(5008, function(){
  console.log('listen on 5008')
})
