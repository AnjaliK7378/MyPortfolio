const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to your local MongoDB (The one you have open in Compass)
mongoose.connect('mongodb://127.0.0.1:27017/portfolioDB')
    .then(() => console.log("✅ Successfully connected to MongoDB!"))
    .catch(err => console.error("❌ MongoDB connection error:", err));

// Define what your Contact Message looks like
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// This is the "Bridge" that receives data from your Portfolio
app.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(200).send({ message: "Message saved to MongoDB!" });
    } catch (error) {
        res.status(500).send({ error: "Failed to save message" });
    }
});

app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));