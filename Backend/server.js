const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./Models/Contacts.js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/contact", async (req, res) => {
    console.log("Contact API hit:", req.body);
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required"
            });
        }

        const newContact = new Contact({
            name,
            email,
            subject,
            message
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Contact message saved successfully!"
        });
    } catch (error) {
        console.error("Contact API error:", error.message);
        res.status(500).json({
            success: false,
            message: "Failed to save contact message"
        });
    }
});


app.get("/", (req, res) => {
    res.send("My Portfolio API is running!");
});

async function startServer() {
    try {
        console.log("Mongo URI loaded:", !!process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully!");

        app.listen(5000, () => {
            console.log("Server running on http://localhost:5000");
        });
    } catch (error) {
        console.error("MongoDB connection failed:", error);
    }
}

startServer();