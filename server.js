const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // Parse JSON requests
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  headers: 'Origin, X-Requested-With, Content-Type, Accept',
}));
// Replace 'your_database_url' and 'your_database_name' with your actual MongoDB credentials
const dbUrl = 'mongodb+srv://atharvnikam778:atharvnikam778@cluster0.xrdoutx.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'sample_mflix';
const db = require('./db'); // Import MongoDB connection
const Item = require('./Item'); 
mongoose.connect(`${dbUrl}/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true });

const Item = mongoose.model('Item', { name: String });

app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
require('dotenv').config();
// const dbUrl = process.env.MONGODB_URI;

app.get("*", function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
