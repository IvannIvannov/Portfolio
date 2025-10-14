const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema за броене на посещения
const pageSchema = new mongoose.Schema({
  page: String,
  views: { type: Number, default: 0 },
  lastVisited: Date
});
const Page = mongoose.model('Page', pageSchema);

// API за увеличаване на посещения
app.post('/api/view', async (req, res) => {
  const { page } = req.body;
  const doc = await Page.findOneAndUpdate(
    { page },
    { $inc: { views: 1 }, $set: { lastVisited: new Date() } },
    { upsert: true, new: true }
  );
  res.json(doc);
});

// API за dashboard
app.get('/api/views', async (req, res) => {
  const data = await Page.find().sort({ views: -1 });
  res.json(data);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
