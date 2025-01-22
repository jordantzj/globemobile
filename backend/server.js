const express = require('express');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb'); // Import ObjectId
const cors = require('cors');
require('dotenv').config(); // For environment variables
const db_password = process.env.MONGODB_PASSWORD; // Get the database password from environment variables
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not set
const app = express();

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
    db = client.db('visitedCountries');
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
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
});

app.post('/addCountries', async (req, res) => {
  try {
    const { countries, id } = req.body; // Expecting a list of countries to add and an `id` field for the document to update
    
    // Check if ID is provided
    if (!id) {
      return res.status(400).json({ error: 'Document ID is required' });
    }

    // Convert the string id to ObjectId
    const objectId = new ObjectId(id);

    const result = await db.collection('visitedCountries').updateOne(
      { _id: objectId }, // Use the ObjectId to match the document
      { $push: { countriesVisited: { $each: countries } } } // Add the new countries to the array
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'No document found with the specified ID' });
    }

    res.json({ message: 'Countries added successfully', result });
  } catch (error) {
    console.error('Error adding countries:', error);
    res.status(500).json({ error: 'Failed to add countries' });
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
