

// ***********************************************************************************************************************************************

const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://nodejs:Adgjmp-12@3.6.29.245:27017/?authSource=admin'; // Replace with your MongoDB URI

// Database name
const dbName = 'nodejs'; // Replace with your database name

async function connectAndQuery() {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    // Connect to the specific database
    const db = client.db(dbName);

    // Perform operations on the database
    const collection = db.collection('cards'); // Replace with your collection name

    // const query = { key: 'data' }; // Replace with your query
    const cursor = collection.find();

    // await cursor.forEach(document => {
    //   console.log(document);
    // });
  } catch (err) {
    console.error('Error:', err);
  } finally {
    // Close the connection when done
    await client.close();
    console.log("closed")
  }
}

// Call the function to connect and perform operations
connectAndQuery();