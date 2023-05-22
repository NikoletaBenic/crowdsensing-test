const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const Measurements = require('./config')
const {check, validationResult} = require("express-validator");
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server side is running')
})

app.get("/getMeasurements", async (req, res) => {
  const snapshot = await Measurements.get();
  const list = snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()}));
  res.send("works");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


