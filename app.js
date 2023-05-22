const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const Measurements = require('./config')

app.get('/', (req, res) => {
  res.send('Server side is running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})