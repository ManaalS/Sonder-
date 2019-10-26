const express = require('express')
const path = require('path')
const app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/page.html'));
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))
