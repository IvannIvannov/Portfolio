const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

// MongoDB connect
let isConnected = false;

async function connectToDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  isConnected = true;
  console.log("MongoDB connected");
}

// Schema
const pageSchema = new mongoose.Schema({
  page: String,
  views: { type: Number, default: 0 },
  lastVisited: Date
});
const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);

// POST /api/view
app.post('/api/view', async (req, res) => {
  await connectToDB();
  const { page } = req.body;

  const doc = await Page.findOneAndUpdate(
    { page },
    { $inc: { views: 1 }, $set: { lastVisited: new Date() } },
    { upsert: true, new: true }
  );

  res.json(doc);
});

// GET /api/views
app.get('/api/views', async (req, res) => {
  await connectToDB();
  const data = await Page.find().sort({ views: -1 });
  res.json(data);
});

module.exports = app;
