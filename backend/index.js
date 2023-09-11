const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./Users");
const jwt = require("jsonwebtoken");
const url = require('url');
const querystring = require('querystring');
const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');



require("./Config");

app.use(express.json());
app.use(cors());
// app.use(express.urlencoded({ extended: true }))



app.post("/"  , async (req , resp ) => {

  const token = req.body.token;

    console.log(token);

    if(token){
        const tokenData =await fetch("https://uat.eezib.in/api/validate_user",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Accept":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({"token":token})
    })
    

    const api =await tokenData.json();
    console.log(api.access_token)
    resp.send({data:api})
    }else{
        console.log("new user")
    }

});


app.get('/cards', async (req, res) => {
  const url = 'mongodb://nodejs:Adgjmp-12@3.111.241.195:27017/';
  const dbName = 'nodejs'; 
  const collectionName = 'cards'; 

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // const query = { key: 'value' };
    const cursor = collection.find();


    const documents = await cursor.toArray();

    res.send(documents);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});



app.listen(5000)




    