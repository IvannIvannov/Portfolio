const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schema and Model
const pageSchema = new mongoose.Schema({
    page: String,
    views: { type: Number, default: 0 },
    lastVisited: Date
});
const Page = mongoose.model('Page', pageSchema);

// Routes
app.post('/api/view', async (req, res) => {
    try {
        const { page } = req.body;
        const doc = await Page.findOneAndUpdate(
            { page },
            { $inc: { views: 1 }, $set: { lastVisited: new Date() } },
            { upsert: true, new: true }
        );
        res.json(doc);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/views', async (req, res) => {
    try {
        const data = await Page.find().sort({ views: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
