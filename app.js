const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const Measurements = require('./config')
const {check, validationResult} = require("express-validator");
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server side is running')
})

app.post("/addMeasurement", [
  check("location").notEmpty().withMessage("Location must be provided!"),
  check("location.lat").notEmpty().isNumeric().withMessage("Invalid location input!"),
  check("location.lng").notEmpty().isNumeric().withMessage("Invalid location input!"),
  check("datetime").notEmpty().withMessage("Please specify time and date for the measurement!")
], async(req,res) => {

  const { temperature, noiseLevel, ambientLight, pressure } = req.body;
  const nonEmptyFields = [temperature, noiseLevel, ambientLight, pressure].filter(field => field !== undefined && field !== '' && field !== null);
  
  if (nonEmptyFields.length < 1) {
      return res.status(400).json({ error: "At least one measurement field must be provided!" });
  }

  if (!nonEmptyFields.every(field => !isNaN(parseFloat(field)))) {
      return res.status(400).json({ error: "Invalid measurement provided!" });
    }

  const errors = validationResult(req);
  if(!errors.isEmpty()){
      console.log(errors);
      return res.status(400).json({errors : errors.array()});
  } else {
      const data = req.body;
  await Measurements.add(data);
  res.send({msg:"Measurement added"});
  console.log(data);
  }
  
});



app.get("/getMeasurements", async (req, res) => {
  const snapshot = await Measurements.get();
  const list = snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()}));
  res.send(list);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


