const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config(); // For environment variables
const db_password = process.env.MONGODB_PASSWORD; // Get the database password from environment variables

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = `mongodb+srv://jordan:${db_password}@globemobile.htknj.mongodb.net/?retryWrites=true&w=majority&appName=globemobile`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to MongoDB
let db;
client.connect()
  .then(() => {
    db = client.db('globemobile'); // Replace with your database name
    console.log('Connected to MongoDB successfully!');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit if the connection fails
  });

// Routes
app.get('/visitedCountries', async (req, res) => {
  try {
    const visitedCountries = await db.collection('visitedCountries').find().toArray();
    res.json(visitedCountries);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/visitedCountries', async (req, res) => {
  try {
    const newCountry = req.body;
    const result = await db.collection('visitedCountries').insertOne(newCountry);
    res.json(result);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Close MongoDB connection on server shutdown
process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection...');
  await client.close();
  process.exit(0);
});
