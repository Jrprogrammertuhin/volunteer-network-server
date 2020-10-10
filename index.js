const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mewxp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(cors());




const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true});
client.connect(err => {
  const collection = client.db("volunteerNetwork").collection("booking");
  console.log("data base ")

  app.post('/addDetails', (req, res) => {
      const details = req.body;
      collection.insertOne(details)
      .then(result => {
            console.log(result)
      })
  })

  client.close();
});



app.listen(5000);